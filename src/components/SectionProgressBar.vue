<template>
    <div class="section-progress">
        <div class="section-progress__header">
            <div class="section-progress__left">
                <span class="section-progress__emoji">{{ section.emoji }}</span>
                <div>
                    <div class="section-progress__name">{{ section.name }}</div>
                    <div class="section-progress__sub">
                        {{ prog.owned }}/{{ prog.total }} · {{ prog.pct }}%
                    </div>
                </div>
            </div>

            <q-btn flat dense round icon="chevron_right" size="sm" color="grey-6" @click="emit('view', section.id)" />
        </div>

        <div class="figuapp-progress" style="margin-top: 6px">
            <div class="figuapp-progress__fill" :style="{ width: prog.pct + '%' }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAlbumStore } from 'stores/album'

interface SectionItem {
    id: string
    name: string
    emoji: string
}

interface Props {
    section: SectionItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'view', sectionId: string): void
}>()

const store = useAlbumStore()

const prog = computed(() => store.sectionProgress(props.section.id))
</script>

<style scoped>
.section-progress {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.section-progress__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.section-progress__left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-progress__emoji {
    font-size: 20px;
    width: 28px;
    text-align: center;
}

.section-progress__name {
    font-size: 13px;
    font-weight: 700;
    color: #f1f5f9;
}

.section-progress__sub {
    font-size: 11px;
    color: #64748b;
}
</style>