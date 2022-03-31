import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
