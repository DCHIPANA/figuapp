<template>
    <div class="sticker-cell" :class="[
        `sticker-cell--${state}`,
        `sticker-cell--${sticker.type || 'normal'}`,
    ]" :style="cellStyle" @click="emit('toggle', sticker.n)">
        <!-- Número -->
        <span class="sticker-cell__number">#{{ sticker.n }}</span>

        <!-- Foto con filtro B&W cuando falta, color cuando está -->
        <img v-if="photoSrc && !imgFailed" :src="photoSrc" class="sticker-cell__photo"
            :class="{ 'sticker-cell__photo--bw': state === 'missing' }" :alt="sticker.label" @error="imgFailed = true"
            draggable="false" />
        <!-- Iniciales: también en gris cuando falta -->
        <div v-else class="sticker-cell__initials" :class="{ 'sticker-cell__initials--bw': state === 'missing' }">{{
            initials }}</div>

        <!-- Nombre -->
        <span v-if="showName" class="sticker-cell__name" :title="sticker.label">
            {{ sticker.shortLabel || sticker.label }}
        </span>

        <!-- Badge +1 repetida -->
        <div v-if="state === 'repeated'" class="sticker-cell__badge">+1</div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface StickerItem {
    n: number
    label: string
    shortLabel?: string
    imgKey?: string
    type?: string
}

interface Props {
    sticker: StickerItem
    state?: 'missing' | 'owned' | 'repeated'
    size?: 'sm' | 'md' | 'lg' | 'auto'  // 'auto' = usa cellWidth prop
    cellWidth?: number                         // px — para grid adaptativo
    showName?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    state: 'missing',
    size: 'md',
    showName: true,
    cellWidth: 0,
})

const emit = defineEmits<{ (e: 'toggle', n: number): void }>()

const imgFailed = ref(false)
watch(() => props.sticker.imgKey, () => { imgFailed.value = false })

const photoSrc = computed(() =>
    props.sticker.imgKey ? `${import.meta.env.BASE_URL}stickers/${props.sticker.imgKey}.webp` : null
)

const initials = computed(() => {
    const raw = (props.sticker.shortLabel || props.sticker.label || '').trim()
    const parts = raw.split(/\s+/).filter(Boolean)
    if (parts.length >= 2)
        return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase()
    return (parts[0]?.substring(0, 2) ?? '?').toUpperCase()
})

// Tamaños base (sin cellWidth)
const SIZE_MAP: Record<string, { w: number; h: number }> = {
    sm: { w: 53, h: 69 },
    md: { w: 67, h: 87 },
    lg: { w: 83, h: 108 },
}

// Si se pasa cellWidth (modo grid adaptativo) usamos eso directamente
const cellStyle = computed(() => {
    if (props.size === 'auto' && props.cellWidth > 0) {
        const w = props.cellWidth
        const h = Math.round(w * 1.35) // ratio ~4:3 vertical
        return { width: w + 'px', minHeight: h + 'px' }
    }
    const s = SIZE_MAP[props.size ?? 'md'] ?? SIZE_MAP.md!
    return { width: s.w + 'px', minHeight: s.h + 'px' }
})

</script>

<style scoped>
/* ── Foto: blanco y negro cuando falta, transición suave al color ─────────── */
.sticker-cell__photo {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: 4px;
    transition: filter 0.3s ease;
    filter: none;
    /* owned / repeated → color normal */
}

.sticker-cell__photo--bw {
    filter: grayscale(100%) brightness(0.7);
    /* missing → blanco y negro oscuro */
}

/* Iniciales: gris apagado cuando falta */
.sticker-cell__initials {
    width: 100%;
    aspect-ratio: 3 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    border-radius: 4px;
    transition: background 0.3s, color 0.3s;
    background: rgba(255, 255, 255, 0.08);
    color: #64748b;
}

.sticker-cell__initials--bw {
    background: rgba(255, 255, 255, 0.04);
    color: #374151;
}

/* ── Badge +1 ──────────────────────────────────────────────────────────────── */
.sticker-cell__badge {
    position: absolute;
    top: 2px;
    right: 2px;
    background: #f5b800;
    color: #000;
    font-size: 7px;
    font-weight: 800;
    border-radius: 4px;
    padding: 0 3px;
    line-height: 13px;
}

/* ── Número y nombre ────────────────────────────────────────────────────────── */
.sticker-cell__number {
    font-size: 9px;
    font-weight: 700;
    color: #64748b;
    line-height: 1;
}

.sticker-cell__name {
    font-size: 8px;
    font-weight: 600;
    color: #94a3b8;
    text-align: center;
    line-height: 1.1;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 2px;
}
</style>
