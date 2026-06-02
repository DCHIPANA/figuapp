<template>
    <q-layout view="hHh lpr fFf">
        <q-page-container>
            <q-page class="registro-page column items-center justify-center q-px-lg q-py-xl">

                <div class="text-center q-mb-xl">
                    <div class="logo-text">Figü<span class="logo-accent">App</span></div>
                    <div class="text-caption text-grey-6 q-mt-xs">
                        Tu colección Panini Mundial 2026
                    </div>
                </div>

                <q-card flat class="figuapp-card full-width q-pa-lg" style="max-width: 400px">
                    <div class="text-subtitle1 text-weight-bold q-mb-md">¿Cómo te llaman?</div>

                    <q-input v-model="name" filled dark label="Tu nombre o apodo" bg-color="blue-grey-10"
                        color="primary" maxlength="30" autofocus @keyup.enter="doRegister" />

                    <div class="text-subtitle1 text-weight-bold q-mt-lg q-mb-md">
                        ¿Qué álbum estás llenando?
                    </div>

                    <q-select v-model="selectedAlbum" :options="albumOptions" filled dark label="Álbum"
                        bg-color="blue-grey-10" color="primary" emit-value map-options />

                    <q-btn unelevated color="primary" text-color="black" label="¡Empezar a coleccionar!" icon="bolt"
                        class="full-width q-mt-xl" size="md" :loading="loading" :disable="!name.trim()"
                        @click="doRegister" />
                </q-card>

                <div class="row q-gutter-sm q-mt-lg justify-center">
                    <q-chip dense color="positive" text-color="white" label="Normal ×1" />
                    <q-chip dense color="blue" text-color="white" label="Especial ×3" />
                    <q-chip dense color="purple" text-color="white" label="Extra Base ×4" />
                    <q-chip dense color="amber" text-color="black" label="Extra Oro ×25" />
                </div>

                <div class="text-caption text-grey-7 q-mt-sm text-center">
                    980 figuritas · 48 selecciones · Extra Stickers · Coca-Cola
                </div>

            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAlbumStore } from 'stores/album'

const router = useRouter()
const store = useAlbumStore()
const $q = useQuasar()

const name = ref('')
const selectedAlbum = ref('mundial2026')
const loading = ref(false)

const albumOptions = [
    { label: 'FIFA World Cup 2026 (Físico)', value: 'mundial2026' },
    { label: 'FIFA World Cup 2026 (Digital)', value: 'mundial2026_virtual' },
]

async function doRegister() {
    const trimmed = name.value.trim()

    if (!trimmed) {
        $q.notify({ type: 'warning', message: 'Escribe tu nombre para continuar' })
        return
    }

    loading.value = true
    // registerOrLogin es async (llama al servidor) → necesita await
    await store.registerOrLogin(trimmed, selectedAlbum.value)
    $q.notify({ type: 'positive', message: `¡Bienvenido, ${trimmed}!` })
    await router.replace('/inicio')
    loading.value = false
}
</script>

<style scoped>
.registro-page {
    background: #0a0e1a;
    min-height: 100vh;
}

.logo-text {
    font-size: 36px;
    font-weight: 900;
    color: #f5b800;
    letter-spacing: -1px;
}

.logo-accent {
    color: #ff6b35;
}
</style>
