<template>
  <div class="home">
    <!-- 加载中 -->
    <div v-if="loading" class="state-box">
      <div class="spinner"></div>
      <p>正在加载相册...</p>
    </div>

    <!-- 错误 -->
    <div v-else-if="error" class="state-box error-box">
      <p class="error-icon">!</p>
      <p>{{ error }}</p>
      <button class="btn" @click="load">重试</button>
    </div>

    <!-- 空 -->
    <div v-else-if="albums.length === 0" class="state-box">
      <p class="empty-icon">📷</p>
      <p>暂无相册</p>
      <p class="hint">请在 COS 存储桶中创建文件夹并上传照片</p>
    </div>

    <!-- 相册列表 -->
    <div v-else class="album-grid">
      <router-link
        v-for="album in albums"
        :key="album.name"
        :to="{ name: 'Album', params: { name: album.name } }"
        class="album-card"
      >
        <div class="album-cover">
          <img
            :src="album.coverThumbnail"
            :alt="album.name"
            loading="lazy"
            @error="onCoverError"
          />
          <span class="album-count">{{ album.count }} 张</span>
        </div>
        <div class="album-info">
          <h3>{{ album.name }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listAlbums } from '../services/cos.js'

const albums = ref([])
const loading = ref(true)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    albums.value = await listAlbums()
  } catch (e) {
    console.error(e)
    error.value = `加载失败：${e.message}。请检查 config.js 中的 COS 配置以及存储桶权限。`
  } finally {
    loading.value = false
  }
}

function onCoverError(e) {
  e.target.style.display = 'none'
}

onMounted(load)
</script>

<style scoped>
.home {
  padding: 32px 0;
}

/* ---- 状态提示 ---- */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: var(--text-secondary);
}
.state-box p { margin: 6px 0; }
.error-box { color: var(--color-danger, #ef4444); }
.error-icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 50%;
  background: var(--color-danger, #ef4444);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
.empty-icon { font-size: 48px; }
.hint { font-size: 13px; color: var(--text-tertiary); }

/* ---- 相册网格 ---- */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.album-card {
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: var(--shadow-card);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.album-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.album-cover {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-subtle);
}
.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.album-card:hover .album-cover img {
  transform: scale(1.05);
}
.album-count {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  backdrop-filter: blur(4px);
}

.album-info {
  padding: 14px 16px;
}
.album-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 600px) {
  .album-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .album-info {
    padding: 10px 12px;
  }
  .album-info h3 {
    font-size: 14px;
  }
}
</style>
