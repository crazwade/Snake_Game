import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/Index.vue';
import GameUI from '../views/GameUI.vue';
import NoFound from '../views/NoFound.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/Snake',
    name: 'GameUI',
    component: GameUI
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NoFound',
    component: NoFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
