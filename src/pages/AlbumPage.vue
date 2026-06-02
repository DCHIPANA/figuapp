<template>
    <q-page style="background: #0a0e1a; padding-bottom: 100px">

        <!-- ── Header adaptativo ──────────────────────────────────────── -->
        <div class="album-header">
            <div v-if="!isCompact" class="row items-center q-pa-md">
                <div class="col">
                    <div class="text-h6 text-weight-bold">Mi Álbum</div>
                    <div class="text-caption text-primary">{{ store.currentAlbum.name }}</div>
                </div>
                <q-chip dense color="primary" text-color="black" :label="store.completionPct + '% listo'" />
            </div>

            <div :class="isCompact ? 'q-px-sm q-pt-sm q-pb-xs' : 'q-px-md q-pb-sm'">
                <q-input v-model="searchQuery" filled dark dense placeholder="Buscar jugador o nº…"
                    bg-color="blue-grey-10" color="primary" clearable @clear="searchQuery = ''">
                    <template #prepend><q-icon name="search" color="grey-6" /></template>
                </q-input>
            </div>

            <!-- Filtros normales (pantalla grande) -->
            <div v-if="!isCompact && !searchQuery.trim()" class="q-px-md q-pb-sm row q-gutter-xs">
                <q-btn v-for="f in stateFilters" :key="f.value" :outline="activeFilter !== f.value"
                    :unelevated="activeFilter === f.value" :color="f.color"
                    :text-color="activeFilter === f.value ? 'white' : f.color" dense size="sm" :label="f.label"
                    @click="activeFilter = f.value" />

                <q-btn v-if="activeFilter === 'repeated'" flat dense size="sm" color="grey-6"
                    :icon="showFlatRepeated ? 'view_carousel' : 'grid_view'"
                    :label="showFlatRepeated ? 'Por secciones' : 'Todas'"
                    @click="showFlatRepeated = !showFlatRepeated" />

                <q-btn v-if="activeFilter === 'repeated'" flat dense size="sm" color="primary" icon="share"
                    label="Compartir" @click="shareRepeatedStickers" />

                <q-btn flat dense size="sm" color="grey-6" icon="tune" label="Rango" @click="showRangeDialog = true" />
            </div>

            <!-- Filtros compactos (iconos, popup flotante) -->
            <div v-if="isCompact && !searchQuery.trim()" class="row q-px-sm q-pb-xs q-gutter-xs items-center">
                <q-btn v-for="f in stateFilters" :key="f.value" :flat="activeFilter !== f.value"
                    :unelevated="activeFilter === f.value" :color="activeFilter === f.value ? f.color : 'grey-7'" round
                    dense size="xs" :icon="f.icon" @click="activeFilter = f.value">
                    <q-tooltip>{{ f.label }}</q-tooltip>
                </q-btn>

                <q-btn v-if="activeFilter === 'repeated'" flat round dense size="xs"
                    :icon="showFlatRepeated ? 'view_carousel' : 'grid_view'" color="grey-6"
                    @click="showFlatRepeated = !showFlatRepeated">
                    <q-tooltip>{{ showFlatRepeated ? 'Ver por secciones' : 'Ver todas' }}</q-tooltip>
                </q-btn>

                <q-btn v-if="activeFilter === 'repeated'" flat round dense size="xs" icon="share" color="primary"
                    @click="shareRepeatedStickers">
                    <q-tooltip>Compartir</q-tooltip>
                </q-btn>

                <q-btn flat round dense size="xs" color="grey-6" icon="tune" @click="showRangeDialog = true">
                    <q-tooltip>Rango</q-tooltip>
                </q-btn>
            </div>
        </div>

        <!-- ── Resultados de búsqueda ─────────────────────────────────── -->
        <div v-if="searchQuery.trim()" :class="isCompact ? 'q-px-sm q-pt-xs' : 'q-pa-md'" ref="gridContainer">
            <div class="text-caption text-grey-5 q-mb-xs">RESULTADOS ({{ searchResults.length }})</div>
            <div class="sticker-grid" :style="gridStyle">
                <StickerCell v-for="item in searchResults" :key="item.sticker.n" :sticker="item.sticker"
                    :state="store.getStickerState(item.sticker.n)" size="auto" :cell-width="cellPx"
                    @toggle="store.toggleSticker" />
            </div>
            <div v-if="!searchResults.length" class="text-center q-py-lg text-caption text-grey-6">Sin resultados</div>
        </div>

        <!-- Vista plana cuando estoy en “Me sobran” -->
        <div v-if="activeFilter === 'repeated' && showFlatRepeated" :class="isCompact ? 'q-px-sm q-pt-xs' : 'q-pa-md'"
            ref="gridContainer">
            <div class="row items-center q-mb-xs">
                <div class="text-caption text-grey-5">ME SOBRAN ({{ repeatedStickers.length }})</div>
                <q-space />
                <q-btn flat dense size="sm" color="primary" icon="share" label="Compartir"
                    @click="shareRepeatedStickers" />
            </div>

            <div class="sticker-grid" :style="gridStyle">
                <StickerCell v-for="item in repeatedStickers" :key="`${item.sectionId}-${item.sticker.n}`"
                    :sticker="item.sticker" :state="store.getStickerState(item.sticker.n)" size="auto"
                    :cell-width="cellPx" @toggle="store.toggleSticker" />
            </div>

            <div v-if="!repeatedStickers.length" class="text-center q-py-lg text-caption text-grey-6">
                No tienes figuritas repetidas
            </div>
        </div>

        <!-- Vista por secciones -->
        <div v-else ref="gridContainer">
            <q-carousel v-model="currentSectionId" swipeable animated transition-prev="slide-right"
                transition-next="slide-left" style="background:transparent" :height="carouselHeight" :keep-alive="true">
                <q-carousel-slide v-for="section in filteredSections" :key="section.id" :name="section.id"
                    style="padding:0;overflow-y:auto">
                    <!-- Encabezado de la sección -->
                    <div class="section-slide-header"
                        :class="isCompact ? 'q-px-sm q-py-xs' : 'q-px-md q-pt-sm q-pb-xs'">
                        <div class="row items-center">
                            <span
                                :style="isCompact ? 'font-size:16px;margin-right:6px' : 'font-size:22px;margin-right:8px'">
                                {{ section.emoji }}
                            </span>
                            <div class="col">
                                <div
                                    :class="isCompact ? 'text-caption text-weight-bold' : 'text-subtitle1 text-weight-bold'">
                                    {{ section.name }}
                                </div>
                                <div class="text-caption text-grey-6">
                                    {{ sectionProg(section.id).owned }}/{{ sectionProg(section.id).total }}
                                    · {{ sectionProg(section.id).pct }}%
                                </div>
                            </div>
                            <div class="text-caption text-grey-6" style="min-width:36px;text-align:right">
                                {{ currentSectionIndex + 1 }}/{{ filteredSections.length }}
                            </div>
                        </div>
                        <div class="figuapp-progress q-mt-xs" :style="isCompact ? 'height:3px' : ''">
                            <div class="figuapp-progress__fill" :style="{ width: sectionProg(section.id).pct + '%' }" />
                        </div>
                    </div>

                    <!-- Grid adaptativo de figuritas -->
                    <div class="sticker-grid q-px-md q-pb-md q-pt-xs" :style="gridStyle">
                        <StickerCell v-for="st in filteredStickers(section)" :key="st.n" :sticker="st"
                            :state="store.getStickerState(st.n)" size="auto" :cell-width="cellPx"
                            @toggle="store.toggleSticker" />
                        <div v-if="filteredStickers(section).length === 0"
                            class="text-caption text-grey-6 text-center q-py-md" style="grid-column:1/-1">
                            Ninguna figurita coincide
                        </div>
                    </div>
                </q-carousel-slide>
            </q-carousel>

            <!-- Controles de carrusel -->
            <div class="carousel-nav" :class="isCompact ? 'q-px-sm' : 'q-px-md'">
                <q-btn flat round dense icon="chevron_left" color="grey-5" :size="isCompact ? 'sm' : 'md'"
                    :disable="currentSectionIndex === 0" @click="prevSection" />
                <q-btn flat dense color="primary" no-caps class="col ellipsis" :size="isCompact ? 'xs' : 'sm'"
                    @click="showSectionPicker = true">
                    <q-icon name="menu" size="14px" class="q-mr-xs" />
                    {{ currentSection?.name }}
                </q-btn>
                <q-btn flat round dense icon="chevron_right" color="grey-5" :size="isCompact ? 'sm' : 'md'"
                    :disable="currentSectionIndex === filteredSections.length - 1" @click="nextSection" />
            </div>

            <!-- Puntos indicadores -->
            <div class="row justify-center q-pb-xs q-gutter-xs">
                <div v-for="sec in dotSections" :key="sec.id" class="carousel-dot"
                    :class="{ 'carousel-dot--active': sec.id === currentSectionId }"
                    @click="currentSectionId = sec.id" />
            </div>
        </div>

        <!-- ── Leyenda (solo pantalla normal) ──────────────────────────── -->
        <div v-if="!isCompact" class="legend-bar">
            <div class="legend-item">
                <div class="legend-dot legend-dot--missing" />Me falta
            </div>
            <div class="legend-item">
                <div class="legend-dot legend-dot--owned" />Tengo
            </div>
            <div class="legend-item">
                <div class="legend-dot legend-dot--repeated" />Me sobra
            </div>
            <q-btn flat dense size="xs" color="grey-6" icon="low_priority" label="Rango"
                @click="showRangeDialog = true" />
        </div>

        <!-- ── Dialog: selector de sección ──────────────────────────────── -->
        <q-dialog v-model="showSectionPicker" position="bottom">
            <q-card flat class="figuapp-card" style="width:100%;max-height:70vh;overflow-y:auto">
                <div class="text-subtitle1 text-weight-bold q-pa-md q-pb-sm">Ir a sección</div>
                <q-list separator>
                    <q-item v-for="sec in filteredSections" :key="sec.id" clickable dense
                        :active="sec.id === currentSectionId" active-color="primary"
                        @click="currentSectionId = sec.id; showSectionPicker = false">
                        <q-item-section avatar style="min-width:32px">
                            <span style="font-size:18px">{{ sec.emoji }}</span>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ sec.name }}</q-item-label>
                            <q-item-label caption class="text-grey-6">
                                {{ sectionProg(sec.id).owned }}/{{ sectionProg(sec.id).total }} · {{
                                    sectionProg(sec.id).pct }}%
                            </q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <div style="width:50px">
                                <div class="figuapp-progress" style="height:4px">
                                    <div class="figuapp-progress__fill"
                                        :style="{ width: sectionProg(sec.id).pct + '%' }" />
                                </div>
                            </div>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        </q-dialog>

        <!-- ── Dialog: rango ───────────────────────────────────────────── -->
        <q-dialog v-model="showRangeDialog" position="bottom">
            <q-card flat class="figuapp-card q-pa-lg" style="width:100%">
                <div class="text-h6 q-mb-md">Marcar rango</div>
                <div class="row q-gutter-sm q-mb-md">
                    <q-input v-model.number="rangeFrom" filled dark label="Desde" type="number" class="col"
                        bg-color="blue-grey-10" color="primary" />
                    <q-input v-model.number="rangeTo" filled dark label="Hasta" type="number" class="col"
                        bg-color="blue-grey-10" color="primary" />
                </div>
                <q-select v-model="rangeState" :options="rangeOptions" filled dark label="Estado"
                    bg-color="blue-grey-10" color="primary" emit-value map-options />
                <div class="row q-mt-md q-gutter-sm">
                    <q-btn flat label="Cancelar" v-close-popup class="col" />
                    <q-btn unelevated color="primary" text-color="black" label="Aplicar" class="col"
                        @click="applyRange" />
                </div>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script setup lang="ts">
// import { computed, ref, onMounted, onUnmounted } from 'vue'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useAlbumStore, type StickerState } from 'stores/album'
import StickerCell from 'components/StickerCell.vue'
import type { AlbumSection } from 'src/data/album_mundial_2026'

type SearchResult = { sticker: AlbumSection['stickers'][number]; sectionId: string }

const store = useAlbumStore()
const $q = useQuasar()

// ── Modo compacto ─────────────────────────────────────────────────────────────
const isCompact = computed(() => $q.screen.height < 500)

// ── Grid adaptativo ──────────────────────────────────────────────────────────
// Medimos el ancho del contenedor real con ResizeObserver para calcular
// cuántas columnas caben respetando un mínimo de 60px por celda.
const gridContainer = ref<HTMLElement | null>(null)
const containerWidth = ref(360)   // fallback

let ro: ResizeObserver | null = null
onMounted(() => {
    ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect.width
        if (w) containerWidth.value = w
    })
    if (gridContainer.value) ro.observe(gridContainer.value)
})
onUnmounted(() => ro?.disconnect())

// Mínimo: 60px por celda (era el tamaño original sin el +15%).
// Máximo: 90px (tablets grandes no se ven gigantes).
const MIN_CELL = 60
const MAX_CELL = 90
const H_PADDING = 32  // padding izquierdo + derecho del contenedor

const cols = computed(() => {
    const available = containerWidth.value - H_PADDING
    // Calcula cuántas columnas caben con el mínimo
    const maxCols = Math.floor(available / MIN_CELL)
    // Limita a un máximo razonable
    return Math.max(3, Math.min(maxCols, 8))
})

const cellPx = computed(() => {
    const available = containerWidth.value - H_PADDING
    const gap = (cols.value - 1) * 6
    const raw = Math.floor((available - gap) / cols.value)
    return Math.min(raw, MAX_CELL)
})

const gridStyle = computed(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols.value}, ${cellPx.value}px)`,
    gap: '6px',
    justifyContent: 'start',
}))

// ── Búsqueda ─────────────────────────────────────────────────────────────────
const searchQuery = ref('')

const searchResults = computed<SearchResult[]>(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return []
    const results: SearchResult[] = []
    store.currentAlbum.sections.forEach(sec => {
        sec.stickers.forEach(st => {
            if (
                String(st.n).includes(q) ||
                st.label.toLowerCase().includes(q) ||
                (st.shortLabel ?? '').toLowerCase().includes(q)
            ) results.push({ sticker: st, sectionId: sec.id })
        })
    })
    return results
})

// ── Filtros ───────────────────────────────────────────────────────────────────
const activeFilter = ref<'all' | StickerState>('all')
const stateFilters = [
    { value: 'all', label: 'Todas', color: 'grey-6', icon: 'grid_view' },
    { value: 'missing', label: 'Me faltan', color: 'negative', icon: 'radio_button_unchecked' },
    { value: 'owned', label: 'Tengo', color: 'positive', icon: 'check_circle' },
    { value: 'repeated', label: 'Me sobran', color: 'primary', icon: 'control_point_duplicate' },
] as const

function filteredStickers(section: AlbumSection) {
    if (activeFilter.value === 'all') return section.stickers
    return section.stickers.filter(st => store.getStickerState(st.n) === activeFilter.value)
}

// ── Secciones filtradas para el carrusel ─────────────────────────────────────
const filteredSections = computed(() => {
    if (activeFilter.value === 'all') return store.currentAlbum.sections
    return store.currentAlbum.sections.filter(sec => filteredStickers(sec).length > 0)
})

// ── Carrusel ──────────────────────────────────────────────────────────────────
const currentSectionId = ref(store.currentAlbum.sections[0]?.id ?? '')
const showSectionPicker = ref(false)

const currentSection = computed(() =>
    filteredSections.value.find(s => s.id === currentSectionId.value)
)
const currentSectionIndex = computed(() =>
    filteredSections.value.findIndex(s => s.id === currentSectionId.value)
)

function prevSection() {
    const i = currentSectionIndex.value
    if (i > 0) currentSectionId.value = filteredSections.value[i - 1]!.id
}
function nextSection() {
    const i = currentSectionIndex.value
    if (i < filteredSections.value.length - 1) currentSectionId.value = filteredSections.value[i + 1]!.id
}

const dotSections = computed(() => {
    const all = filteredSections.value
    const cur = currentSectionIndex.value
    const MAX = 10
    if (all.length <= MAX) return all
    const half = Math.floor(MAX / 2)
    const start = Math.max(0, Math.min(cur - half, all.length - MAX))
    return all.slice(start, start + MAX)
})

// Altura del carrusel: encabezado fijo + filas de figuritas
const carouselHeight = computed(() => {
    const sec = currentSection.value
    if (!sec) return '400px'
    const count = filteredStickers(sec).length
    const rows = Math.ceil(count / cols.value)
    const headerH = isCompact.value ? 60 : 80
    const cellH = Math.round(cellPx.value * 1.35) + 6  // celda + gap
    const h = headerH + rows * cellH + 24
    return `${Math.max(250, h)}px`
})

// ── Progreso ──────────────────────────────────────────────────────────────────
function sectionProg(id: string) { return store.sectionProgress(id) }

// ── Rango ─────────────────────────────────────────────────────────────────────
const showRangeDialog = ref(false)
const rangeFrom = ref(1)
const rangeTo = ref(20)
const rangeState = ref<StickerState>('owned')
const rangeOptions = [
    { label: 'Tengo (1 vez)', value: 'owned' },
    { label: 'Me sobra (+1)', value: 'repeated' },
    { label: 'Me falta', value: 'missing' },
] as const

function applyRange() {
    if (rangeFrom.value > rangeTo.value || rangeFrom.value < 1) {
        $q.notify({ type: 'warning', message: 'Rango inválido' })
        return
    }
    store.markRange(rangeFrom.value, rangeTo.value, rangeState.value)
    const count = rangeTo.value - rangeFrom.value + 1
    const label = rangeOptions.find(o => o.value === rangeState.value)?.label ?? rangeState.value
    $q.notify({ type: 'positive', message: `${count} figuritas marcadas como "${label}"` })
    showRangeDialog.value = false
}
type FlatStickerItem = {
    sticker: AlbumSection['stickers'][number]
    sectionId: string
    sectionName: string
}

const showFlatRepeated = ref(false)

watch(activeFilter, (val) => {
    showFlatRepeated.value = val === 'repeated'
})

const repeatedStickers = computed<FlatStickerItem[]>(() => {
    const results: FlatStickerItem[] = []

    store.currentAlbum.sections.forEach(sec => {
        sec.stickers.forEach(st => {
            if (store.getStickerState(st.n) === 'repeated') {
                results.push({
                    sticker: st,
                    sectionId: sec.id,
                    sectionName: sec.name,
                })
            }
        })
    })

    return results
})

function buildRepeatedShareText() {
    if (!repeatedStickers.value.length) {
        return 'No tengo figuritas repetidas.'
    }

    const grouped = new Map<string, string[]>()

    repeatedStickers.value.forEach(item => {
        const line = `${item.sticker.n} - ${item.sticker.label}`
        if (!grouped.has(item.sectionName)) grouped.set(item.sectionName, [])
        grouped.get(item.sectionName)!.push(line)
    })

    let text = `Mis figuritas repetidas (${repeatedStickers.value.length}):\n\n`

    for (const [sectionName, lines] of grouped.entries()) {
        text += `*${sectionName}*\n`
        text += lines.map(l => `- ${l}`).join('\n')
        text += '\n\n'
    }

    return text.trim()
}

async function shareRepeatedStickers() {
    const text = buildRepeatedShareText()

    try {
        if (typeof navigator !== 'undefined' && navigator.share) {
            await navigator.share({
                title: 'Figuritas repetidas',
                text,
            })
            return
        }
    } catch {
        // si el usuario cancela, seguimos con fallback
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.album-header {
    background: #111827;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* Carrusel */
.section-slide-header {
    background: #111827;
}

.carousel-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #111827;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 4px;
    padding-bottom: 4px;
}

.carousel-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: background .2s, width .2s;
}

.carousel-dot--active {
    width: 18px;
    border-radius: 4px;
    background: #f5b800;
}

/* Leyenda */
.legend-bar {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    background: #111827;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 16px;
    font-size: 11px;
    color: #94a3b8;
    z-index: 9;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border: 1.5px solid;
}

.legend-dot--missing {
    background: #252e42;
    border-color: rgba(255, 255, 255, 0.2);
}

.legend-dot--owned {
    background: rgba(34, 197, 94, .2);
    border-color: #22c55e;
}

.legend-dot--repeated {
    background: rgba(245, 184, 0, .2);
    border-color: #f5b800;
}
</style>
