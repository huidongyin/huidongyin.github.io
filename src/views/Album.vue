<template>
  <div class="album-page">
    <!-- 头部 -->
    <header class="album-header">
      <router-link to="/" class="back-btn" title="返回">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回
      </router-link>
      <h2 class="album-title">{{ name }}</h2>
      <span class="album-meta" v-if="!loading">{{ photos.length }} 张照片</span>
    </header>

    <!-- 加载中 -->
    <div v-if="loading" class="state-box">
      <div class="spinner"></div>
      <p>加载照片中...</p>
    </div>

    <!-- 错误 -->
    <div v-else-if="error" class="state-box error-box">
      <p>{{ error }}</p>
      <button class="btn" @click="load">重试</button>
    </div>

    <!-- 空 -->
    <div v-else-if="photos.length === 0" class="state-box">
      <p>该相册暂无照片</p>
    </div>

    <!-- 照片网格 -->
    <div v-else class="photo-grid">
      <div
        v-for="(photo, i) in photos"
        :key="photo.key"
        class="photo-item"
        @click="openViewer(i)"
      >
        <img
          :src="photo.thumbnail"
          :alt="photoName(photo.key)"
          loading="lazy"
        />
      </div>
    </div>

    <!-- 灯箱 -->
    <PhotoViewer
      v-if="viewerOpen"
      :photos="photos"
      :index="viewerIndex"
      @close="viewerOpen = false"
      @update:index="viewerIndex = $event"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { listPhotos, getAlbumPrefix } from '../services/cos.js'
import PhotoViewer from '../components/PhotoViewer.vue'

const props = defineProps({
  name: { type: String, required: true },
})

const photos = ref([])
const loading = ref(true)
const error = ref('')
const viewerOpen = ref(false)
const viewerIndex = ref(0)

function photoName(key) {
  return decodeURIComponent(key.split('/').pop())
}

function openViewer(i) {
  viewerIndex.value = i
  viewerOpen.value = true
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const prefix = getAlbumPrefix(props.name)
    photos.value = await listPhotos(prefix)
  } catch (e) {
    console.error(e)
    error.value = `加载失败：${e.message}`
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => props.name, load)
</script>

<style scoped>
.album-page {
  padding: 24px 0;
}

.album-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 0.2s;
}
.back-btn:hover {
  background: var(--bg-subtle);
}

.album-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.album-meta {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-left: auto;
}

/* ---- 状态提示 ---- */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  color: var(--text-secondary);
}
.error-box { color: var(--color-danger, #ef4444); }

/* ---- 照片网格 ---- */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.photo-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  background: var(--bg-subtle);
  position: relative;
}
.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.photo-item:hover img {
  transform: scale(1.06);
}

@media (max-width: 600px) {
  .photo-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .photo-item {
    border-radius: 4px;
  }
  .album-title {
    font-size: 18px;
  }
}
</style>
