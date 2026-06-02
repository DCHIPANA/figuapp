<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAlbumStore, enrichAlbumWithImgKeys } from 'stores/album'
import { ALBUM_MUNDIAL_2026 } from 'src/data/album_mundial_2026'
import { ALBUM_MUNDIAL_2026_VIRTUAL } from 'src/data/album_mundial_2026_virtual'

const albumStore = useAlbumStore()

onMounted(() => {
  enrichAlbumWithImgKeys(ALBUM_MUNDIAL_2026)
  enrichAlbumWithImgKeys(ALBUM_MUNDIAL_2026_VIRTUAL)
  // loadFromStorage es async → marcamos con void para que ESLint no se queje
  void albumStore.loadFromStorage()
})
</script>