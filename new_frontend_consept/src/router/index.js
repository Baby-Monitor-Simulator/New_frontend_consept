import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import WebSocketTest from '@/views/WebSocketTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/websocket',
    name: 'WebSocket',
    component: WebSocketTest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router