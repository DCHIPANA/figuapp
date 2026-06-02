<template>
    <q-page style="background: #0a0e1a; padding-bottom: 80px">
        <div
            style="background: #111827; position: sticky; top: 0; z-index: 10; border-bottom: 1px solid rgba(255,255,255,0.06)">
            <div class="row items-center q-pa-md">
                <q-btn flat round dense icon="arrow_back" color="grey-4" @click="$router.back()" />

                <div class="q-ml-sm col">
                    <div class="row items-center q-gutter-xs">
                        <span style="font-size: 22px">{{ section?.emoji }}</span>
                        <div class="text-h6 text-weight-bold">{{ section?.name }}</div>
                    </div>
                    <div class="text-caption text-grey-6">{{ prog.owned }}/{{ prog.total }} · {{ prog.pct }}%</div>
                </div>

                <q-chip dense color="primary" text-color="black" :label="prog.pct + '%'" />
            </div>

            <div class="q-px-md q-pb-sm">
                <div class="figuapp-progress">
                    <div class="figuapp-progress__fill" :style="{ width: prog.pct + '%' }" />
                </div>
            </div>

            <div class="q-px-md q-pb-sm row q-gutter-xs">
                <q-btn v-for="f in stateFilters" :key="f.value" :outline="activeFilter !== f.value"
                    :unelevated="activeFilter === f.value" :color="f.color"
                    :text-color="activeFilter === f.value ? 'black' : f.color" dense size="sm" :label="f.label"
                    @click="activeFilter = f.value" />
            </div>
        </div>

        <div class="q-pa-md">
            <div class="sticker-wrap">
                <StickerCell v-for="st in pagedStickers" :key="st.n" :sticker="st" :state="store.getStickerState(st.n)"
                    size="lg" @toggle="onToggle" />
            </div>

            <div v-if="pagedStickers.length === 0" class="text-center q-py-xl text-grey-6">
                Ninguna figurita coincide
            </div>

            <div v-if="totalPages > 1" class="row justify-center q-mt-md">
                <q-pagination v-model="currentPage" :max="totalPages" direction-links flat color="primary"
                    active-color="primary" active-text-color="black" />
            </div>
        </div>

        <q-dialog v-model="showDetail" position="bottom">
            <q-card flat class="figuapp-card q-pa-lg" style="width: 100%" v-if="detailSticker">
                <div class="row items-center q-gutter-md q-mb-md">
                    <div class="detail-photo-wrap">
                        <img v-if="showDetailImg && detailSticker.imgKey"
                            :src="`/stickers/${detailSticker.imgKey}.webp`" class="detail-photo"
                            @error="showDetailImg = false" />
                        <div v-else class="detail-initials">{{ detailInitials }}</div>
                    </div>

                    <div class="col">
                        <div class="text-h6 text-weight-bold">{{ detailSticker.label }}</div>
                        <div class="text-caption text-grey-6">
                            Figurita #{{ detailSticker.n }} · {{ section?.name }}
                        </div>
                        <q-chip dense :color="typeColor(detailSticker.type)" text-color="white"
                            :label="typeLabel(detailSticker.type)" size="sm" class="q-mt-xs" />
                    </div>
                </div>

                <div class="text-subtitle2 text-grey-5 q-mb-sm">Estado actual</div>
                <div class="row q-gutter-sm">
                    <q-btn v-for="s in stickerStates" :key="s.value" :unelevated="currentDetailState === s.value"
                        :outline="currentDetailState !== s.value" :color="s.color" dense
                        :text-color="currentDetailState === s.value ? 'black' : s.color" :label="s.label" class="col"
                        @click="setDetailState(s.value)" />
                </div>

                <div class="q-mt-md text-caption text-grey-6 text-center">
                    Toca la figurita en el álbum para cambiar el estado rápidamente
                </div>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAlbumStore, type StickerState } from 'stores/album'
import StickerCell from 'components/StickerCell.vue'
import type { AlbumSticker } from 'src/data/album_mundial_2026'

const route = useRoute()
const store = useAlbumStore()
const $q = useQuasar()

const sectionId = computed(() => String(route.params.sectionId || ''))
const section = computed(() => store.currentAlbum.sections.find((s) => s.id === sectionId.value))
const prog = computed(() => store.sectionProgress(sectionId.value))

const activeFilter = ref<'all' | StickerState>('all')
const stateFilters = [
    { value: 'all', label: 'Todas', color: 'grey-6' },
    { value: 'missing', label: 'Me faltan', color: 'negative' },
    { value: 'owned', label: 'Tengo', color: 'positive' },
    { value: 'repeated', label: 'Me sobran', color: 'primary' }
] as const

const filteredStickers = computed(() => {
    const all = section.value?.stickers || []
    if (activeFilter.value === 'all') return all
    return all.filter((st) => store.getStickerState(st.n) === activeFilter.value)
})

const PAGE_SIZE = 30
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(filteredStickers.value.length / PAGE_SIZE))

const pagedStickers = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredStickers.value.slice(start, start + PAGE_SIZE)
})

const showDetail = ref(false)
const showDetailImg = ref(true)
const detailSticker = ref<AlbumSticker | null>(null)
const currentDetailState = ref<StickerState>('missing')

const detailInitials = computed(() => {
    const raw = (detailSticker.value?.shortLabel || detailSticker.value?.label || '').trim()
    const parts = raw.split(/\s+/).filter(Boolean)

    if (parts.length >= 2) {
        return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase()
    }

    return (parts[0]?.substring(0, 2) ?? '?').toUpperCase()
})

function onToggle(n: number) {
    store.toggleSticker(n)
    $q.notify({
        type: 'positive',
        timeout: 600,
        message: `#${n} → ${store.getStickerState(n)}`,
        position: 'top'
    })
}

const stickerStates = [
    { value: 'missing', label: 'Me falta', color: 'grey-6' },
    { value: 'owned', label: 'Tengo', color: 'positive' },
    { value: 'repeated', label: 'Me sobra', color: 'primary' }
] as const

function setDetailState(s: StickerState) {
    if (detailSticker.value) {
        store.setStickerState(detailSticker.value.n, s)
        currentDetailState.value = s
    }
}

const TYPE_COLORS: Record<string, string> = {
    normal: 'blue-grey',
    shield: 'blue',
    group_photo: 'blue',
    special: 'purple',
    extra_base: 'purple',
    extra_bronze: 'brown',
    extra_silver: 'blue-grey',
    extra_gold: 'amber',
    coca: 'red'
}

const TYPE_LABELS: Record<string, string> = {
    normal: 'Jugador',
    shield: 'Escudo',
    group_photo: 'Foto Grupal',
    special: 'Especial',
    extra_base: 'Extra Base',
    extra_bronze: 'Extra Bronce',
    extra_silver: 'Extra Plata',
    extra_gold: 'Extra Oro',
    coca: 'Coca-Cola'
}

function typeColor(t?: string) {
    return TYPE_COLORS[t || ''] || 'grey'
}

function typeLabel(t?: string) {
    return TYPE_LABELS[t || ''] || (t || '')
}
</script>

<style scoped>
.sticker-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}

.detail-photo-wrap {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    background: #252e42;
    flex-shrink: 0;
}

.detail-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail-initials {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: #94a3b8;
}
</style>