import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import WebSocketTest from "@/views/WebSocketTest.vue";
import GraphView from "@/views/GraphView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/websocket",
    name: "WebSocket",
    component: WebSocketTest,
  },
  {
    path: "/graph",
    name: "graph",
    component: GraphView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
