<template>
    <!--
    TradeCard — muestra un intercambio con el nuevo flujo:
    pending  → receptor puede Aceptar o Rechazar; emisor puede Anular
    accepted → ambos ven 3 botones: Anular / Confirmar / Compartir
    confirmed / rejected / cancelled → solo resumen
  -->
    <div class="trade-card" :class="{
        'trade-card--pending': trade.status === 'pending',
        'trade-card--accepted': trade.status === 'accepted',
        'trade-card--confirmed': trade.status === 'confirmed',
    }">
        <!-- ── Encabezado ──────────────────────────────────────────────── -->
        <div class="trade-card__header">
            <div class="trade-card__avatar" :style="{ background: avatarBg + '22', color: avatarBg }">
                {{ initial }}
            </div>
            <div class="trade-card__info">
                <div class="trade-card__name">{{ partnerName }}</div>
                <div class="trade-card__date">{{ dateLabel }}</div>
            </div>
            <q-chip dense :color="statusColor" text-color="white" size="sm" :label="statusLabel" />
        </div>

        <!-- ── Tabla de figuritas con foto + país + jugador ──────────────── -->
        <div class="trade-table">
            <!-- Columna: yo ofrezco / ellos ofrecen -->
            <div class="trade-col">
                <div class="trade-col__label">
                    {{ iAmFrom ? 'Yo ofrezco' : 'Ellos ofrecen' }}
                </div>
                <div v-for="st in offeredStickers" :key="st.n" class="trade-sticker-row">
                    <div class="trade-sticker-thumb">
                        <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="stickerUrl(st.imgKey)"
                            class="trade-sticker-thumb__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                        <div v-else class="trade-sticker-thumb__initials">{{ initials(st) }}</div>
                    </div>
                    <div class="trade-sticker-row__info">
                        <span class="trade-sticker-row__code">{{ countryCode(st) }}</span>
                        <span class="trade-sticker-row__name">{{ st.shortLabel || st.label }}</span>
                    </div>
                </div>
            </div>

            <!-- Flecha central -->
            <div class="trade-col__arrow">
                <q-icon name="swap_horiz" color="grey-6" size="22px" />
            </div>

            <!-- Columna: yo pido / ellos piden -->
            <div class="trade-col">
                <div class="trade-col__label">
                    {{ iAmFrom ? 'Yo pido' : 'Ellos piden' }}
                </div>
                <div v-for="st in wantedStickers" :key="st.n" class="trade-sticker-row">
                    <div class="trade-sticker-thumb">
                        <img v-if="st.imgKey && !failedImgs.has(st.imgKey)" :src="stickerUrl(st.imgKey)"
                            class="trade-sticker-thumb__img" @error="failedImgs.add(st.imgKey!)" draggable="false" />
                        <div v-else class="trade-sticker-thumb__initials">{{ initials(st) }}</div>
                    </div>
                    <div class="trade-sticker-row__info">
                        <span class="trade-sticker-row__code">{{ countryCode(st) }}</span>
                        <span class="trade-sticker-row__name">{{ st.shortLabel || st.label }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- ── Acciones según estado ──────────────────────────────────── -->

        <!-- PENDIENTE: receptor acepta/rechaza; emisor puede anular -->
        <div v-if="trade.status === 'pending'" class="trade-card__actions">
            <template v-if="iAmRecipient">
                <q-btn unelevated color="positive" label="Aceptar" size="sm" class="col"
                    @click="emit('accept', trade.id)" />
                <q-btn unelevated color="negative" label="Rechazar" size="sm" class="col"
                    @click="emit('reject', trade.id)" />
            </template>
            <template v-else>
                <q-btn flat color="negative" label="Anular solicitud" size="sm" class="full-width" icon="cancel"
                    @click="emit('delete', trade.id)" />
            </template>
        </div>

        <!-- ACEPTADO: ambos ven los 3 botones principales -->
        <div v-if="trade.status === 'accepted'" class="column q-gutter-xs">
            <div class="text-caption text-positive text-center q-mb-xs">
                ✅ Intercambio aceptado — procede a realizarlo
            </div>
            <!-- Aviso según tipo de álbum -->
            <div v-if="isDigitalAlbum" class="text-caption text-grey-5 text-center q-mb-xs">
                Álbum digital: crea la solicitud en la app de Panini Collectors
            </div>

            <div class="row q-gutter-xs">
                <!-- Anular -->
                <q-btn flat color="negative" label="Anular" size="sm" class="col" icon="cancel"
                    @click="emit('delete', trade.id)" />
                <!-- Confirmar: actualiza el álbum -->
                <q-btn unelevated color="positive" label="Confirmar" size="sm" class="col" icon="check_circle"
                    @click="emit('confirm', trade.id)" />
                <!-- Compartir: Web Share API → todas las apps de mensajería -->
                <q-btn unelevated color="blue" label="Compartir" size="sm" class="col" icon="share"
                    @click="shareTradeInfo" />
            </div>
        </div>

        <!-- CONFIRMADO / RECHAZADO / CANCELADO: solo botón eliminar -->
        <div v-if="['confirmed', 'rejected', 'cancelled'].includes(trade.status)"
            class="row justify-between items-center q-mt-xs">
            <div class="text-caption text-grey-6">
                {{ trade.status === 'confirmed' ? '✅ Figuritas actualizadas' : '' }}
                {{ trade.status === 'rejected' ? '❌ Rechazado' : '' }}
                {{ trade.status === 'cancelled' ? '🚫 Anulado' : '' }}
            </div>
            <q-btn flat dense size="xs" color="grey-6" icon="delete_outline" label="Eliminar"
                @click="emit('delete', trade.id)" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAlbumStore } from 'stores/album'
import type { AlbumSticker } from 'src/data/album_mundial_2026'

interface TradeItem {
    id: string
    from: string
    fromName: string
    to: string
    toName?: string
    albumId: string
    offered: number[]
    wanted: number[]
    status: string
    createdAt: string
}

const props = defineProps<{ trade: TradeItem }>()

const emit = defineEmits<{
    (e: 'accept', tradeId: string): void
    (e: 'reject', tradeId: string): void
    (e: 'confirm', tradeId: string): void
    (e: 'delete', tradeId: string): void
}>()

const store = useAlbumStore()
const failedImgs = reactive(new Set<string>())

const myId = computed(() => store.user?.id ?? '')
const iAmFrom = computed(() => props.trade.from === myId.value)
const iAmRecipient = computed(() => props.trade.to === myId.value)

// Nombre de la contraparte
const partnerName = computed(() => {
    if (iAmFrom.value) {
        // Buscar en allUsers si no tenemos toName
        return props.trade.toName
            ?? store.allUsers.find(u => u.id === props.trade.to)?.name
            ?? 'Coleccionista'
    }
    return props.trade.fromName
})

const COLORS = ['#F5B800', '#FF6B35', '#22C55E', '#3B82F6', '#A855F7']
const initial = computed(() => (partnerName.value || '?')[0]?.toUpperCase())
const avatarBg = computed(() => COLORS[partnerName.value.charCodeAt(0) % COLORS.length])

const STATUS_LABEL: Record<string, string> = {
    pending: 'Pendiente',
    accepted: 'Aceptado',
    rejected: 'Rechazado',
    confirmed: 'Confirmado',
    cancelled: 'Anulado',
}
const STATUS_COLOR: Record<string, string> = {
    pending: 'warning',
    accepted: 'positive',
    rejected: 'negative',
    confirmed: 'blue',
    cancelled: 'grey',
}
const statusLabel = computed(() => STATUS_LABEL[props.trade.status] ?? props.trade.status)
const statusColor = computed(() => STATUS_COLOR[props.trade.status] ?? 'grey')

const dateLabel = computed(() => {
    if (!props.trade.createdAt) return ''
    return new Date(props.trade.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'short' })
})

// ¿Es álbum digital? (para mostrar aviso de app Panini)
const isDigitalAlbum = computed(() => props.trade.albumId.includes('virtual'))

function stickerUrl(imgKey: string) {
    return `${import.meta.env.BASE_URL}stickers/${imgKey}.webp`
}

// ── Helpers de figurita ───────────────────────────────────────────────────────
function getStickerByN(n: number): AlbumSticker | null {
    for (const sec of store.currentAlbum.sections) {
        const st = sec.stickers.find(s => s.n === n)
        if (st) return st
    }
    return null
}

function initials(st: AlbumSticker): string {
    const parts = (st.shortLabel || st.label || '').trim().split(/\s+/).filter(Boolean)
    if (parts.length >= 2) return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase()
    return (parts[0]?.substring(0, 2) ?? '?').toUpperCase()
}

function countryCode(st: AlbumSticker): string {
    return st.imgKey?.split('_')[0] ?? ''
}

const offeredStickers = computed(() =>
    props.trade.offered.map(n => getStickerByN(n)).filter((s): s is AlbumSticker => s !== null)
)
const wantedStickers = computed(() =>
    props.trade.wanted.map(n => getStickerByN(n)).filter((s): s is AlbumSticker => s !== null)
)

// ── Compartir: Web Share API → WhatsApp, Telegram, etc. ──────────────────────
async function shareTradeInfo() {
    const partner = partnerName.value
    const albumName = store.currentAlbum.name

    const offeredLines = offeredStickers.value
        .map(st => `  • [${countryCode(st)}] ${st.shortLabel || st.label} (#${st.n})`)
        .join('\n')

    const wantedLines = wantedStickers.value
        .map(st => `  • [${countryCode(st)}] ${st.shortLabel || st.label} (#${st.n})`)
        .join('\n')

    const text = [
        `📦 Intercambio Panini — ${albumName}`,
        `👤 Con: ${partner}`,
        '',
        `🟡 Yo ofrezco:`,
        offeredLines,
        '',
        `🔵 Yo pido:`,
        wantedLines,
        '',
        `Acordado con FigüApp 🏆`,
    ].join('\n')

    if (navigator.share) {
        try {
            await navigator.share({ title: 'Intercambio Panini', text })
        } catch {
            // cancelado por el usuario
        }
    } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
    }
}
</script>

<style scoped>
.trade-card {
    background: #1c2436;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 10px;
}

.trade-card--pending {
    border-color: #f5b800;
}

.trade-card--accepted {
    border-color: #22c55e;
}

.trade-card--confirmed {
    border-color: #3b82f6;
}

.trade-card__header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.trade-card__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
}

.trade-card__name {
    font-size: 13px;
    font-weight: 700;
}

.trade-card__date {
    font-size: 11px;
    color: #64748b;
}

.trade-card__info {
    flex: 1;
}

/* ── Tabla de figuritas ──────────────────── */
.trade-table {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin-bottom: 10px;
    overflow: hidden;
}

.trade-col {
    flex: 1;
    min-width: 0;
}

.trade-col__label {
    font-size: 9px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.trade-col__arrow {
    align-self: center;
    flex-shrink: 0;
}

.trade-sticker-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 3px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.trade-sticker-thumb {
    width: 32px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    background: #252e42;
}

.trade-sticker-thumb__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.trade-sticker-thumb__initials {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    color: #94a3b8;
}

.trade-sticker-row__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.trade-sticker-row__code {
    font-size: 9px;
    font-weight: 700;
    color: #f5b800;
    line-height: 1;
}

.trade-sticker-row__name {
    font-size: 10px;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
}

/* ── Acciones ────────────────────────────── */
.trade-card__actions {
    display: flex;
    gap: 8px;
}
</style>
