<template>
  <Teleport to="body">
    <div class="viewer-overlay" @click.self="$emit('close')">
      <!-- 工具栏 -->
      <div class="viewer-toolbar">
        <span class="viewer-counter">{{ index + 1 }} / {{ photos.length }}</span>
        <span class="viewer-filename">{{ currentFilename }}</span>
        <button class="viewer-btn" title="关闭" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- 主图 -->
      <div class="viewer-body" @click.self="$emit('close')">
        <button class="nav-btn nav-prev" @click="prev" v-show="index > 0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="viewer-img-wrap">
          <div v-if="imgLoading" class="img-loading"><div class="spinner light"></div></div>
          <img
            :src="currentPhoto.url"
            :alt="currentFilename"
            class="viewer-img"
            @load="imgLoading = false"
            @error="imgLoading = false"
          />
        </div>

        <button class="nav-btn nav-next" @click="next" v-show="index < photos.length - 1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  photos: { type: Array, required: true },
  index: { type: Number, required: true },
})
const emit = defineEmits(['close', 'update:index'])

const imgLoading = ref(true)

const currentPhoto = computed(() => props.photos[props.index] || {})
const currentFilename = computed(() => {
  const key = currentPhoto.value.key || ''
  return decodeURIComponent(key.split('/').pop())
})

watch(() => props.index, () => {
  imgLoading.value = true
})

function prev() {
  if (props.index > 0) emit('update:index', props.index - 1)
}
function next() {
  if (props.index < props.photos.length - 1) emit('update:index', props.index + 1)
}

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.viewer-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ---- 工具栏 ---- */
.viewer-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  flex-shrink: 0;
}
.viewer-counter {
  background: rgba(255, 255, 255, 0.12);
  padding: 3px 10px;
  border-radius: 20px;
  font-variant-numeric: tabular-nums;
}
.viewer-filename {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.viewer-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.2s;
}
.viewer-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* ---- 主体 ---- */
.viewer-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 60px;
}

.viewer-img-wrap {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.viewer-img {
  max-width: 90vw;
  max-height: calc(100vh - 80px);
  object-fit: contain;
  border-radius: 4px;
  user-select: none;
  -webkit-user-drag: none;
}

.img-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---- 导航按钮 ---- */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s;
}
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}
.nav-prev { left: 12px; }
.nav-next { right: 12px; }

/* ---- spinner ---- */
.spinner.light {
  border-color: rgba(255,255,255,0.2);
  border-top-color: #fff;
}

@media (max-width: 600px) {
  .viewer-body {
    padding: 0 8px;
  }
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  .nav-prev { left: 4px; }
  .nav-next { right: 4px; }
}
</style>
