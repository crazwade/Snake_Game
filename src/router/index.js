import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/Index.vue';
import GameUI from '../views/GameUI.vue';
import Nofound from '../views/NoFound.vue';

const routes = [
  {
    path: '/Snake',
    name: 'Index',
    component: Index
  },
  {
    path: '/',
    name: 'GameUI',
    component: GameUI
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Nofound',
    component: Nofound,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
