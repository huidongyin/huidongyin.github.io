import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Album from '../views/Album.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/album/:name', name: 'Album', component: Album, props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
