<template>
  <div class="app-layout">
    <nav class="app-nav">
      <div class="nav-inner">
        <router-link to="/" class="nav-brand">
          <svg class="brand-icon" width="28" height="28" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="16" fill="var(--color-primary)"/>
            <circle cx="38" cy="40" r="10" fill="#fff" opacity=".9"/>
            <polygon points="20,80 45,50 60,65 72,52 85,80" fill="#fff" opacity=".85"/>
          </svg>
          <span>{{ title }}</span>
        </router-link>
      </div>
    </nav>
    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import config from './config.js'
const title = config.title || '我的相册'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ---- 导航栏 ---- */
.app-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--border-light);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-icon {
  border-radius: 6px;
  flex-shrink: 0;
}

/* ---- 主内容 ---- */
.app-main {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 600px) {
  .nav-inner,
  .container {
    padding: 0 16px;
  }
  .nav-brand {
    font-size: 16px;
  }
}
</style>
