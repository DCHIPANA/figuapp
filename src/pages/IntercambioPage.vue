<template>
    <q-page style="background: #0a0e1a; padding-bottom: 80px">

        <!-- ── Header ────────────────────────────────────────────────────── -->
        <div style="background:#111827;border-bottom:1px solid rgba(255,255,255,0.06);padding:16px">
            <div class="row items-center">
                <div class="text-h6 text-weight-bold col">Zona de Intercambio</div>
                <q-icon :name="store.serverOnline ? 'cloud_done' : 'cloud_off'"
                    :color="store.serverOnline ? 'positive' : 'warning'" size="20px" class="q-mr-sm"><q-tooltip>{{
                        store.serverOnline ? 'Conectado' : 'Sin conexión — modo local' }}</q-tooltip></q-icon>
                <q-btn flat round dense icon="refresh" color="grey-5" size="sm" :loading="refreshing"
                    @click="doRefresh">
                    <q-tooltip>Actualizar</q-tooltip>
                </q-btn>
                <q-badge v-if="store.myPendingTrades.length" color="negative"
                    :label="store.myPendingTrades.length + ' nueva/s'" class="q-ml-sm" />
            </div>
        </div>

        <div class="q-pa-md">
            <q-tabs v-model="tab" dense align="left" active-color="primary" indicator-color="primary" class="q-mb-md">
                <q-tab name="traders" label="Coleccionistas" />
                <q-tab name="my_trades" label="Mis intercambios" />
                <q-tab name="ratios" label="Valores" />
            </q-tabs>

            <!-- ── Tab: Coleccionistas ──────────────────────────────────── -->
            <div v-if="tab === 'traders'">
                <div v-if="otherUsers.length === 0" class="text-center q-py-xl text-grey-6">
                    <q-icon name="group" size="48px" color="grey-8" /><br />
                    Aún no hay otros coleccionistas.<br />
                    <q-btn outline color="primary" size="sm" icon="refresh" label="Buscar ahora" :loading="refreshing"
                        class="q-mt-md" @click="doRefresh" />
                </div>

                <div v-for="u in pagedUsers" :key="u.id" class="trader-card q-mb-md">
                    <div class="row items-center q-mb-sm">
                        <div class="avatar-circle q-mr-sm"
                            :style="{ background: avatarBg(u.name) + '22', color: avatarBg(u.name) }">
                            {{ (u.name ?? '?').charAt(0).toUpperCase() }}
                        </div>
                        <div class="col">
                            <div class="text-subtitle2 text-weight-bold">{{ u.name }}</div>
                            <div class="text-caption text-grey-6">{{ (u.owned || []).length }} figuritas · {{
                                (u.repeated || []).length }} repites</div>
                        </div>
                        <q-btn unelevated color="primary" text-color="black" size="sm" label="Proponer"
                            @click="openTradeDialog(u)" />
                    </div>

                    <!-- Coincidencias: fotos en vez de números -->
                    <div v-if="matchOwned(u).length">
                        <div class="text-caption text-positive q-mb-xs">Tiene lo que te falta:</div>
                        <div class="row q-gutter-xs">
                            <div v-for="st in matchOwned(u).slice(0, matchPage * MATCH_PAGE_SIZE)" :key="st.n"
                                class="match-sticker">
                                <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="`/stickers/${st.imgKey}.webp`"
                                    class="match-sticker__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                                <div v-else class="match-sticker__initials">{{ stickerInitials(st) }}</div>
                                <div class="match-sticker__label">{{ stickerCountryCode(st) }}</div>
                                <div class="match-sticker__name">{{ st.shortLabel }}</div>
                            </div>
                            <q-btn v-if="matchOwned(u).length > matchPage * MATCH_PAGE_SIZE" flat dense size="xs"
                                color="grey-6" :label="`+${matchOwned(u).length - matchPage * MATCH_PAGE_SIZE} más`"
                                @click="matchPage++" />
                        </div>
                    </div>

                    <div v-if="matchRepeated(u).length" class="q-mt-sm">
                        <div class="text-caption text-primary q-mb-xs">Tú tienes lo que les falta:</div>
                        <div class="row q-gutter-xs">
                            <div v-for="st in matchRepeated(u).slice(0, matchPage * MATCH_PAGE_SIZE)" :key="st.n"
                                class="match-sticker">
                                <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="`/stickers/${st.imgKey}.webp`"
                                    class="match-sticker__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                                <div v-else class="match-sticker__initials">{{ stickerInitials(st) }}</div>
                                <div class="match-sticker__label">{{ stickerCountryCode(st) }}</div>
                                <div class="match-sticker__name">{{ st.shortLabel }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Paginación de coleccionistas -->
                <div v-if="totalUserPages > 1" class="row justify-center q-mt-md">
                    <q-pagination v-model="userPage" :max="totalUserPages" flat color="primary" active-color="primary"
                        active-text-color="black" />
                </div>
            </div>

            <!-- ── Tab: Mis intercambios ────────────────────────────────── -->
            <div v-if="tab === 'my_trades'">
                <div v-if="pendingTrades.length" class="q-mb-md">
                    <div class="text-caption text-grey-5 q-mb-xs">SOLICITUDES PENDIENTES</div>
                    <TradeCard v-for="trade in pendingTrades" :key="trade.id" :trade="trade" @accept="acceptTrade"
                        @reject="rejectTrade" @confirm="confirmTrade" @delete="cancelTrade" />
                </div>

                <div v-if="otherTrades.length === 0" class="text-center q-py-xl text-grey-6">
                    <q-icon name="swap_horiz" size="48px" color="grey-8" /><br />No hay intercambios aún
                </div>
            </div>

            <!-- ── Tab: Valores ─────────────────────────────────────────── -->
            <div v-if="tab === 'ratios'">
                <q-card flat class="figuapp-card q-pa-md">
                    <div class="text-caption text-grey-5 q-mb-md">ESCALA OFICIAL DE CANJE</div>
                    <q-list separator>
                        <q-item v-for="r in TRADE_RATIOS" :key="r.from">
                            <q-item-section>
                                <q-item-label class="text-weight-medium">{{ r.from }} → {{ r.to }}</q-item-label>
                                <q-item-label v-if="r.description" caption class="text-grey-6">{{ r.description
                                    }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-chip dense color="amber-9" text-color="black" :label="r.ratio" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
                <q-card flat class="figuapp-card q-pa-md q-mt-md">
                    <div class="text-caption text-grey-5 q-mb-sm">RAREZA DE EXTRA STICKERS</div>
                    <div class="row q-gutter-xs">
                        <q-chip dense color="amber" text-color="black" label="Oro — 1:1900 sobres" />
                        <q-chip dense color="blue-grey" text-color="white" label="Plata — 1:500 sobres" />
                        <q-chip dense color="brown" text-color="white" label="Bronce — 1:200 sobres" />
                        <q-chip dense color="purple" text-color="white" label="Base — 1:100 sobres" />
                    </div>
                </q-card>
            </div>
        </div>

        <!-- ── Dialog: Proponer intercambio ─────────────────────────────── -->
        <q-dialog v-model="showTradeDialog" position="bottom" full-height>
            <q-card v-if="tradeTarget" flat class="figuapp-card q-pa-lg"
                style="width:100%;max-height:85vh;overflow-y:auto">
                <div class="text-h6 q-mb-xs">Intercambio con {{ tradeTarget.name }}</div>
                <div class="text-caption text-grey-6 q-mb-md">Toca las figuritas para seleccionarlas</div>

                <div v-if="!myOfferableStickers.length" class="text-caption text-grey-6 q-mb-md">
                    No tienes repites que le sirvan a este coleccionista.
                </div>

                <div class="trade-sticker-grid q-mb-md">
                    <div v-for="st in myOfferableStickers" :key="st.n" class="trade-sticker"
                        :class="{ 'trade-sticker--selected': offerSet.has(st.n) }" @click="toggleOffer(st.n)">
                        <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="`/stickers/${st.imgKey}.webp`"
                            class="trade-sticker__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                        <div v-else class="trade-sticker__initials">{{ stickerInitials(st) }}</div>
                        <div class="trade-sticker__country">{{ stickerCountryCode(st) }}</div>
                        <div class="trade-sticker__name">{{ st.shortLabel }}</div>
                        <q-icon v-if="offerSet.has(st.n)" name="check_circle" color="positive"
                            class="trade-sticker__check" />
                    </div>
                </div>

                <div v-if="!theirOfferableStickers.length" class="text-caption text-grey-6 q-mb-md">
                    Este coleccionista no tiene repites que te falten.
                </div>

                <div class="trade-sticker-grid q-mb-lg">
                    <div v-for="st in theirOfferableStickers" :key="st.n" class="trade-sticker"
                        :class="{ 'trade-sticker--selected': wantSet.has(st.n) }" @click="toggleWant(st.n)">
                        <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="`/stickers/${st.imgKey}.webp`"
                            class="trade-sticker__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                        <div v-else class="trade-sticker__initials">{{ stickerInitials(st) }}</div>
                        <div class="trade-sticker__country">{{ stickerCountryCode(st) }}</div>
                        <div class="trade-sticker__name">{{ st.shortLabel }}</div>
                        <q-icon v-if="wantSet.has(st.n)" name="check_circle" color="positive"
                            class="trade-sticker__check" />
                    </div>
                </div>

                <div class="row q-gutter-sm">
                    <q-btn flat label="Cancelar" v-close-popup class="col" />
                    <q-btn flat color="primary" icon="share" label="Compartir" class="col"
                        @click="shareTradeSelection" />
                    <q-btn unelevated color="primary" text-color="black" label="Enviar propuesta" class="col"
                        @click="sendTradeProposal" />
                </div>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAlbumStore, TRADE_RATIOS } from 'stores/album'
import TradeCard from 'components/TradeCard.vue'
import type { PublicUserProfile } from 'stores/album'
import type { AlbumSticker } from 'src/data/album_mundial_2026'

const store = useAlbumStore()
const $q = useQuasar()

const tab = ref<'traders' | 'my_trades' | 'ratios'>('traders')
const refreshing = ref(false)
const matchPage = ref(1)
const MATCH_PAGE_SIZE = 8
const failedImgs = reactive(new Set<string>())

const COLORS = ['#F5B800', '#FF6B35', '#22C55E', '#3B82F6', '#A855F7']
function avatarBg(name: string) { return COLORS[(name || '').charCodeAt(0) % COLORS.length] }

// ── BUG FIX: excluir al propio usuario de la lista ───────────────────────────
const otherUsers = computed(() =>
    store.allUsers.filter(u => {
        const sameAlbum = u.currentAlbumId
            ? u.currentAlbumId === store.currentAlbumId
            : true

        return u.id !== store.user?.id && sameAlbum
    })
)

// Paginación de coleccionistas: 5 por página
const USERS_PER_PAGE = 5
const userPage = ref(1)
const totalUserPages = computed(() => Math.ceil(otherUsers.value.length / USERS_PER_PAGE))
const pagedUsers = computed(() => {
    const start = (userPage.value - 1) * USERS_PER_PAGE
    return otherUsers.value.slice(start, start + USERS_PER_PAGE)
})

const sortedTrades = computed(() =>
    [...store.trades].sort((a, b) => {
        const da = new Date(a.createdAt || '').getTime()
        const db = new Date(b.createdAt || '').getTime()
        return db - da
    })
)

const pendingTrades = computed(() =>
    sortedTrades.value.filter(t => t.status === 'accepted' && t.to === store.user?.id)
)

const otherTrades = computed(() =>
    sortedTrades.value.filter(t => !(t.status === 'pending' && t.to === store.user?.id))
)

function getAllAlbumStickerNumbers(): number[] {
    return store.currentAlbum.sections.flatMap(sec =>
        sec.stickers.map(st => st.n)
    )
}

function getMissingNumbersFromOwned(ownedNumbers: number[]): number[] {
    const ownedSet = new Set(ownedNumbers)
    return getAllAlbumStickerNumbers().filter(n => !ownedSet.has(n))
}

// ── Helpers para obtener sticker completo (con imgKey) desde número ───────────
function getStickerByN(n: number): AlbumSticker | null {
    for (const sec of store.currentAlbum.sections) {
        const st = sec.stickers.find(s => s.n === n)
        if (st) return st
    }
    return null
}

function stickerInitials(st: AlbumSticker): string {
    const raw = (st.shortLabel || st.label || '').trim()
    const parts = raw.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase()
    return (parts[0]?.substring(0, 2) ?? '?').toUpperCase()
}

// Código país desde el imgKey (ej: "ARG_86" → "ARG")
function stickerCountryCode(st: AlbumSticker): string {
    if (!st.imgKey) return ''
    return st.imgKey.split('_')[0] ?? ''
}

// ── Coincidencias: devuelve objetos AlbumSticker en vez de solo números ───────
function matchOwned(user: PublicUserProfile): AlbumSticker[] {
    const theirRepeated = new Set(user.repeated || [])
    return store.missingList
        .filter(n => theirRepeated.has(n))
        .map(n => getStickerByN(n))
        .filter((st): st is AlbumSticker => st !== null)
}

function matchRepeated(user: PublicUserProfile): AlbumSticker[] {
    const theirMissing = new Set(getMissingNumbersFromOwned(user.owned || []))
    return store.repeatedList
        .filter(n => theirMissing.has(n))
        .map(n => getStickerByN(n))
        .filter((st): st is AlbumSticker => st !== null)
}

async function doRefresh() {
    refreshing.value = true
    await store.refreshFromServer()
    refreshing.value = false
    $q.notify({ type: 'positive', message: 'Lista actualizada', timeout: 1200 })
}

function getStickerEntryByN(n: number) {
    for (const sec of store.currentAlbum.sections) {
        const st = sec.stickers.find(s => s.n === n)
        if (st) return { section: sec, sticker: st }
    }
    return null
}

function formatShareLine(n: number) {
    const entry = getStickerEntryByN(n)
    if (!entry) return `- ${n}`

    const code = entry.sticker.imgKey?.split('_')[0] ?? entry.section.id.toUpperCase()
    const label = entry.sticker.shortLabel || entry.sticker.label || `#${entry.sticker.n}`
    return `${entry.section.emoji ?? '⭐'} ${code} ${label}`
}

function buildTradeShareText() {
    const wanted = [...wantSet.value]
    const offered = [...offerSet.value]

    let text = `Solicitud de intercambio\n\n`

    text += `Pido:\n`
    if (wanted.length) {
        text += wanted.map(n => `- ${formatShareLine(n)}`).join('\n') + '\n'
    } else {
        text += '- (sin selección)\n'
    }

    text += `\nOfrezco:\n`
    if (offered.length) {
        text += offered.map(n => `- ${formatShareLine(n)}`).join('\n')
    } else {
        text += '- (sin selección)'
    }

    return text
}

async function confirmTrade(tradeId: string) {
    const ok = await store.finalizeTradeServer(tradeId, true)
    if (!ok) {
        $q.notify({ type: 'negative', message: 'No se pudo confirmar' })
        return
    }

    store.confirmTrade(tradeId)
    await store.loadOwnStickersFromServer()
    await store.refreshFromServer()

    $q.notify({ type: 'positive', message: 'Intercambio confirmado' })
}

async function shareTradeSelection() {
    const text = buildTradeShareText()

    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Solicitud de intercambio',
                text
            })
            return
        }
    } catch {
        // cancelado por el usuario
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}



// ── Trade dialog ──────────────────────────────────────────────────────────────
const showTradeDialog = ref(false)
const tradeTarget = ref<PublicUserProfile | null>(null)
const offerSet = ref(new Set<number>())
const wantSet = ref(new Set<number>())

// Stickers completos para el dialog
const myOfferableStickers = computed(() => {
    if (!tradeTarget.value) return []
    const theirMissing = new Set(getMissingNumbersFromOwned(tradeTarget.value.owned || []))

    return store.repeatedList
        .filter(n => theirMissing.has(n))
        .map(n => getStickerByN(n))
        .filter((st): st is AlbumSticker => st !== null)
})

const theirOfferableStickers = computed(() => {
    if (!tradeTarget.value) return []
    const myMissing = new Set(store.missingList)

    return (tradeTarget.value.repeated || [])
        .filter(n => myMissing.has(n))
        .map(n => getStickerByN(n))
        .filter((st): st is AlbumSticker => st !== null)
})

function openTradeDialog(u: PublicUserProfile) {
    tradeTarget.value = u
    offerSet.value = new Set<number>()
    wantSet.value = new Set<number>()
    showTradeDialog.value = true
}

function toggleOffer(n: number) {
    if (offerSet.value.has(n)) offerSet.value.delete(n)
    else offerSet.value.add(n)
    offerSet.value = new Set(offerSet.value)
}

function toggleWant(n: number) {
    if (wantSet.value.has(n)) wantSet.value.delete(n)
    else wantSet.value.add(n)
    wantSet.value = new Set(wantSet.value)
}

async function sendTradeProposal() {
    const offered = [...offerSet.value]
    const wanted = [...wantSet.value]

    if (!offered.length || !wanted.length || !tradeTarget.value) {
        $q.notify({ type: 'warning', message: 'Selecciona figuritas de ambos lados' })
        return
    }

    const trade = await store.proposeTrade({
        toUserId: tradeTarget.value.id,
        offered,
        wanted
    })

    if (trade) {
        $q.notify({ type: 'positive', message: '✅ Propuesta enviada' })
        showTradeDialog.value = false
        await store.refreshFromServer()
    } else {
        $q.notify({ type: 'negative', message: 'No se pudo enviar la propuesta' })
    }
}

async function cancelTrade(tradeId: string) {
    const trade = store.trades.find(t => t.id === tradeId)
    if (!trade) return

    // Pendiente / aceptado: cancelar en servidor
    if (trade.status === 'pending' || trade.status === 'accepted') {
        const ok = await store.cancelTradeServer(tradeId)
        if (!ok) {
            $q.notify({ type: 'negative', message: 'No se pudo anular' })
            return
        }
    } else {
        // Confirmado / rechazado / cancelado: borrar del servidor
        const ok = await store.deleteTradeServer(tradeId)
        if (!ok) {
            $q.notify({ type: 'negative', message: 'No se pudo eliminar' })
            return
        }
    }

    await store.refreshFromServer()
    $q.notify({ type: 'warning', message: 'Intercambio actualizado' })
}

async function acceptTrade(tradeId: string) {
    const ok = await store.respondTradeServer(tradeId, true)
    if (ok) {
        await store.refreshFromServer()
        $q.notify({ type: 'positive', message: 'Intercambio aceptado' })
    } else {
        $q.notify({ type: 'negative', message: 'No se pudo aceptar' })
    }
}

async function rejectTrade(tradeId: string) {
    const ok = await store.respondTradeServer(tradeId, false)
    if (ok) {
        await store.refreshFromServer()
        $q.notify({ type: 'warning', message: 'Intercambio rechazado' })
    } else {
        $q.notify({ type: 'negative', message: 'No se pudo rechazar' })
    }
}

onMounted(() => {
    void store.refreshFromServer()
})

watch(tab, (value) => {
    if (value === 'my_trades') {
        void store.refreshFromServer()
    }
})
</script>

<style scoped>
.trader-card {
    background: #1c2436;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 14px;
}

.avatar-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
}

/* Figurita en la lista de coincidencias */
.match-sticker {
    width: 58px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #252e42;
    border-radius: 8px;
    padding: 4px;
    overflow: hidden;
}

.match-sticker__img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 4px;
}

.match-sticker__initials {
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

.match-sticker__label {
    font-size: 8px;
    font-weight: 700;
    color: #f5b800;
    margin-top: 2px;
}

.match-sticker__name {
    font-size: 8px;
    color: #94a3b8;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

/* Figurita en el dialog de propuesta */
.trade-sticker-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 67px);
    gap: 8px;
    justify-content: start;
    align-content: start;
    max-height: 45vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 4px;
}

.trade-sticker {
    width: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #252e42;
    border-radius: 8px;
    padding: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: .15s;
    position: relative;
    border: 2px solid transparent;
}

.trade-sticker:active {
    transform: scale(0.94);
}

.trade-sticker--selected {
    border-color: #22c55e;
    background: rgba(34, 197, 94, 0.1);
}

.trade-sticker__img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 4px;
}

.trade-sticker__initials {
    width: 100%;
    aspect-ratio: 3/4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.trade-sticker__country {
    font-size: 9px;
    font-weight: 700;
    color: #f5b800;
    margin-top: 2px;
}

.trade-sticker__name {
    font-size: 8px;
    color: #94a3b8;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.trade-sticker__check {
    position: absolute;
    top: 2px;
    right: 2px;
}
</style>
