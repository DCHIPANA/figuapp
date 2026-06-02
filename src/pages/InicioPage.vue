<template>
    <q-page class="q-pa-md" style="background: #0a0e1a; padding-bottom: 80px">

        <!-- ── Header ────────────────────────────────────────────────── -->
        <div class="row items-center q-mb-md">
            <div class="avatar-circle q-mr-sm" :style="{ background: avatarBg + '22', color: avatarBg }">
                {{ initial }}
            </div>
            <div class="col">
                <div class="text-subtitle1 text-weight-bold">Hola, {{ store.user?.name }}!</div>
                <div class="row items-center cursor-pointer" @click="showAlbumSwitcher = true">
                    <div class="text-caption text-primary">{{ store.currentAlbum.name }}</div>
                    <q-icon name="unfold_more" size="14px" color="primary" class="q-ml-xs" />
                </div>
            </div>
            <q-chip dense color="primary" text-color="black" :label="completionPct + '% listo'" />
        </div>

        <!-- ── Progreso ───────────────────────────────────────────────── -->
        <q-card flat class="figuapp-card q-pa-md q-mb-md">
            <div class="row justify-between items-end q-mb-sm">
                <div>
                    <div class="text-h5 text-weight-black text-primary">{{ completionPct }}%</div>
                    <div class="text-caption text-grey-6">completado</div>
                </div>
                <div class="text-right">
                    <div class="text-subtitle2 text-weight-bold">
                        {{ store.ownedCount }}<span class="text-grey-6">/{{ store.totalStickers }}</span>
                    </div>
                    <div class="text-caption text-grey-6">figuritas</div>
                </div>
            </div>
            <div class="figuapp-progress">
                <div class="figuapp-progress__fill" :style="{ width: completionPct + '%' }" />
            </div>
        </q-card>

        <!-- ── Stats ─────────────────────────────────────────────────── -->
        <div class="row q-gutter-sm q-mb-md">
            <div class="stat-box col">
                <div class="stat-num text-positive">{{ store.ownedCount }}</div>
                <div class="stat-lbl">Tengo</div>
            </div>
            <div class="stat-box col">
                <div class="stat-num text-primary">{{ store.repeatedCount }}</div>
                <div class="stat-lbl">Me sobran</div>
            </div>
            <div class="stat-box col">
                <div class="stat-num text-negative">{{ store.missingCount }}</div>
                <div class="stat-lbl">Me faltan</div>
            </div>
        </div>

        <!-- ── Me sobran: fotos con país y apellido ────────────────────── -->
        <q-card v-if="store.repeatedCount > 0" flat class="figuapp-card q-pa-md q-mb-md"
            style="border-left:3px solid #f5b800">
            <div class="row items-center q-mb-sm">
                <div class="text-caption text-weight-bold text-grey-5 col">ME SOBRAN ({{ store.repeatedCount }})</div>
                <q-btn flat dense label="Intercambiar" color="primary" size="xs"
                    @click="$router.push('/intercambio')" />
            </div>

            <!-- Scroll horizontal de miniaturas -->
            <div class="repeated-scroll">
                <div v-for="st in repeatedStickers.slice(0, repeatedVisible)" :key="st.n" class="repeated-mini">
                    <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="`/stickers/${st.imgKey}.webp`"
                        class="repeated-mini__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                    <div v-else class="repeated-mini__initials">{{ stickerInitials(st) }}</div>
                    <div class="repeated-mini__country">{{ stickerCountryCode(st) }}</div>
                    <div class="repeated-mini__name">{{ st.shortLabel }}</div>
                </div>

                <!-- Botón ver más -->
                <div v-if="repeatedStickers.length > repeatedVisible" class="repeated-mini repeated-mini--more"
                    @click="repeatedVisible += 16">
                    <div class="repeated-mini__more-icon">+{{ repeatedStickers.length - repeatedVisible }}</div>
                    <div class="repeated-mini__name">más</div>
                </div>
            </div>
        </q-card>

        <!-- ── Top secciones ─────────────────────────────────────────── -->
        <q-card flat class="figuapp-card q-pa-md q-mb-md">
            <div class="row items-center q-mb-sm">
                <div class="text-caption text-weight-bold text-grey-5 col">SECCIONES</div>
                <q-btn flat dense label="Ver álbum" color="primary" size="xs" @click="$router.push('/album')" />
            </div>

            <!-- Completadas al 100%: chips con scroll horizontal -->
            <div v-if="completedSections.length > 0" class="q-mb-sm">
                <div class="text-caption text-grey-6 q-mb-xs">COMPLETADAS</div>
                <div class="completed-scroll">
                    <div v-for="sec in completedSections" :key="sec.id" class="completed-chip">
                        <span class="completed-chip__flag">{{ sec.emoji }}</span>
                        <span class="completed-chip__code">{{ sec.code }}</span>
                        <q-icon name="check_circle" color="positive" size="14px" />
                    </div>
                </div>
            </div>

            <!-- Las demás secciones (< 100%) con barra de progreso -->
            <SectionProgressBar v-for="section in incompleteSections" :key="section.id" :section="section"
                @view="id => $router.push(`/album/${id}`)" />
        </q-card>

        <!-- ── Escala de valores ──────────────────────────────────────── -->
        <q-card flat class="figuapp-card q-pa-md q-mb-md">
            <div class="text-caption text-weight-bold text-grey-5 q-mb-sm">ESCALA DE VALORES</div>
            <q-list dense>
                <q-item v-for="r in TRADE_RATIOS" :key="r.from" dense>
                    <q-item-section>
                        <q-item-label class="text-body2 text-weight-medium">{{ r.from }} → {{ r.to }}</q-item-label>
                        <q-item-label v-if="r.description" caption class="text-grey-6">{{ r.description
                        }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-chip dense color="amber-9" text-color="black" :label="r.ratio" size="sm" />
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card>

        <!-- ── Acciones ───────────────────────────────────────────────── -->
        <div class="column q-gutter-sm">
            <q-btn outline color="grey-7" icon="add" label="Agregar otro álbum" class="full-width"
                @click="showAddAlbum = true" />
        </div>

        <!-- ── Dialogs ────────────────────────────────────────────────── -->

        <!-- Cambiar álbum activo -->
        <q-dialog v-model="showAlbumSwitcher" position="bottom">
            <q-card flat class="figuapp-card" style="width:100%">
                <div class="text-subtitle1 text-weight-bold q-pa-md q-pb-sm">Tus álbumes</div>
                <q-list separator>
                    <q-item v-for="album in userAlbums" :key="album.id" clickable
                        :active="album.id === store.currentAlbumId" active-color="primary"
                        @click="switchAlbum(album.id)">
                        <q-item-section avatar>
                            <q-icon :name="album.id === store.currentAlbumId ? 'menu_book' : 'book'"
                                :color="album.id === store.currentAlbumId ? 'primary' : 'grey-6'" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ album.name }}</q-item-label>
                            <q-item-label caption class="text-grey-6">
                                {{ album.id === store.currentAlbumId ? 'Álbum activo' : 'Toca para cambiar' }}
                            </q-item-label>
                        </q-item-section>
                        <q-item-section v-if="album.id === store.currentAlbumId" side>
                            <q-chip dense color="primary" text-color="black" label="Activo" size="sm" />
                        </q-item-section>
                    </q-item>
                </q-list>
                <div class="q-pa-md"><q-btn flat label="Cerrar" v-close-popup class="full-width" /></div>
            </q-card>
        </q-dialog>

        <!-- Agregar álbum -->
        <q-dialog v-model="showAddAlbum" position="bottom">
            <q-card flat class="figuapp-card q-pa-lg" style="width:100%">
                <div class="text-h6 q-mb-md">Agregar álbum</div>
                <q-input v-model="newAlbumName" filled dark label="Nombre del álbum" bg-color="blue-grey-10"
                    color="primary" />
                <div class="row q-mt-md q-gutter-sm">
                    <q-btn flat label="Cancelar" v-close-popup class="col" />
                    <q-btn unelevated color="primary" text-color="black" label="Agregar" class="col"
                        @click="doAddAlbum" />
                </div>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAlbumStore, TRADE_RATIOS } from 'stores/album'
import SectionProgressBar from 'components/SectionProgressBar.vue'
import type { AlbumSticker } from 'src/data/album_mundial_2026'

const store = useAlbumStore()
const $q = useQuasar()

const COLORS = ['#F5B800', '#FF6B35', '#22C55E', '#3B82F6', '#A855F7']
const initial = computed(() => (store.user?.name ?? '?').charAt(0).toUpperCase())
const avatarBg = computed(() => COLORS[(store.user?.name || '').charCodeAt(0) % COLORS.length])
const completionPct = computed(() => store.completionPct)
const userAlbums = computed(() => store.user?.albums ?? [])

// ── Secciones: completadas vs incompletas ────────────────────────────────────

// Código corto para el chip: máx 3 letras en mayúsculas desde el id o el nombre
function sectionCode(id: string, name: string): string {
    // Si el id ya es corto (ej: 'arg', 'bra'), lo usamos
    if (id.length <= 4) return id.toUpperCase()
    // Sino tomamos las iniciales del nombre (ej: 'Países Bajos' → 'PB')
    return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 3)
}

const completedSections = computed(() =>
    store.currentAlbum.sections
        .filter(s => store.sectionProgress(s.id).pct === 100)
        .map(s => ({ ...s, code: sectionCode(s.id, s.name) }))
)

const incompleteSections = computed(() =>
    store.currentAlbum.sections
        .filter(s => store.sectionProgress(s.id).pct < 100)
        .map(s => ({ ...s, pct: store.sectionProgress(s.id).pct }))
        .sort((a, b) => b.pct - a.pct)
        .slice(0, 8)   // top 8 incompletas por %, no más
)

// ── Me sobran: fotos ──────────────────────────────────────────────────────────
const failedImgs = reactive(new Set<string>())
const repeatedVisible = ref(16)

function getStickerByN(n: number): AlbumSticker | null {
    for (const sec of store.currentAlbum.sections) {
        const st = sec.stickers.find(s => s.n === n)
        if (st) return st
    }
    return null
}

const repeatedStickers = computed(() =>
    store.repeatedList
        .map(n => getStickerByN(n))
        .filter((st): st is AlbumSticker => st !== null)
)

function stickerInitials(st: AlbumSticker): string {
    const parts = (st.shortLabel || st.label || '').trim().split(/\s+/).filter(Boolean)
    if (parts.length >= 2) return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase()
    return (parts[0]?.substring(0, 2) ?? '?').toUpperCase()
}

function stickerCountryCode(st: AlbumSticker): string {
    if (!st.imgKey) return ''
    // imgKey format: 'ARG_86' → 'ARG'
    return st.imgKey.split('_')[0] ?? ''
}

// ── Cambio de álbum ──────────────────────────────────────────────────────────
const showAlbumSwitcher = ref(false)

function switchAlbum(albumId: string) {
    store.switchAlbum(albumId)
    showAlbumSwitcher.value = false
    const name = userAlbums.value.find(a => a.id === albumId)?.name ?? albumId
    $q.notify({ type: 'positive', message: `Cambiado a: ${name}` })
}

// ── Agregar álbum ────────────────────────────────────────────────────────────
const showAddAlbum = ref(false)
const newAlbumName = ref('')

function doAddAlbum() {
    const name = newAlbumName.value.trim()
    if (!name) return
    const id = `album_${Date.now()}`
    store.addAlbum(id, name)
    $q.notify({ type: 'positive', message: `Álbum "${name}" agregado` })
    $q.dialog({
        title: 'Álbum creado',
        message: `¿Cambiar al álbum "${name}" ahora?`,
        cancel: { label: 'No, luego', flat: true },
        ok: { label: 'Sí, cambiar', color: 'primary', unelevated: true, textColor: 'black' }
    }).onOk(() => store.switchAlbum(id))
    newAlbumName.value = ''
    showAddAlbum.value = false
}
</script>

<style scoped>
.avatar-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    flex-shrink: 0;
}

.stat-box {
    background: #1c2436;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-num {
    font-size: 22px;
    font-weight: 800;
}

.stat-lbl {
    font-size: 10px;
    color: #64748b;
    margin-top: 2px;
}

/* ── Me sobran: scroll horizontal ────────────────── */
.repeated-scroll {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 4px;
    /* ocultar scrollbar feo en Android */
    scrollbar-width: none;
}

.repeated-scroll::-webkit-scrollbar {
    display: none;
}

.repeated-mini {
    flex-shrink: 0;
    width: 54px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #252e42;
    border-radius: 8px;
    padding: 4px 2px;
    overflow: hidden;
}

.repeated-mini__img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 4px;
}

.repeated-mini__initials {
    width: 100%;
    aspect-ratio: 3/4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.repeated-mini__country {
    font-size: 8px;
    font-weight: 700;
    color: #f5b800;
    margin-top: 2px;
}

.repeated-mini__name {
    font-size: 8px;
    color: #94a3b8;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.repeated-mini--more {
    background: rgba(245, 184, 0, 0.1);
    border: 1px dashed #f5b800;
    cursor: pointer;
    justify-content: center;
}

.repeated-mini__more-icon {
    font-size: 16px;
    font-weight: 800;
    color: #f5b800;
}

/* ── Completadas: scroll horizontal ──────────────── */
.completed-scroll {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: none;
}

.completed-scroll::-webkit-scrollbar {
    display: none;
}

.completed-chip {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 3px;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 20px;
    padding: 3px 8px 3px 5px;
    cursor: pointer;
}

.completed-chip__flag {
    font-size: 16px;
    line-height: 1;
}

.completed-chip__code {
    font-size: 11px;
    font-weight: 700;
    color: #f1f5f9;
}
</style>
