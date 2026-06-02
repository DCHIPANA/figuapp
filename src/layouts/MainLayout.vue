<template>
  <q-layout view="lHh lpr lFf">
    <div class="status-bar-spacer" />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-dark text-white">
      <!--
        isCompact: pantalla pequeña (alto < 500px → popup flotante).
        En modo compacto: footer más delgado, sin labels, iconos más pequeños.
      -->
      <q-tabs v-model="activeTab" dense align="justify" active-color="primary" indicator-color="transparent"
        :style="isCompact ? 'height:44px' : 'height:60px'">
        <q-tab name="inicio" icon="home" :label="isCompact ? undefined : 'Inicio'"
          :icon-right="isCompact ? undefined : undefined" :class="isCompact ? 'compact-tab' : 'text-caption'"
          @click="router.push('/inicio')" />
        <q-tab name="album" icon="menu_book" :label="isCompact ? undefined : 'Álbum'"
          :class="isCompact ? 'compact-tab' : 'text-caption'" @click="router.push('/album')" />
        <q-tab name="intercambio" icon="swap_horiz" :label="isCompact ? undefined : 'Intercambio'"
          :class="isCompact ? 'compact-tab' : 'text-caption'" @click="router.push('/intercambio')">
          <q-badge v-if="pendingCount > 0" color="negative" floating rounded>
            {{ pendingCount }}
          </q-badge>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlbumStore } from 'stores/album'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const store = useAlbumStore()
const $q = useQuasar()

const pendingCount = computed(() => store.myPendingTrades.length)

// Compacto cuando el alto de la ventana es menor a 500px (popup flotante)
const isCompact = computed(() => $q.screen.height < 500)

const activeTab = ref<'inicio' | 'album' | 'intercambio'>('inicio')

watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/album')) activeTab.value = 'album'
    else if (path.startsWith('/intercambio')) activeTab.value = 'intercambio'
    else activeTab.value = 'inicio'
  },
  { immediate: true }
)
</script>

<style scoped>
.status-bar-spacer {
  height: env(safe-area-inset-top, 0px);
  background: #111827;
}

/* En modo compacto los iconos se achican un poco */
.compact-tab :deep(.q-icon) {
  font-size: 20px !important;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity .18s, transform .18s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
