import { RouteRecordRaw } from 'vue-router';

const Route: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/renderer/vue/views/pages/home/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/renderer/vue/views/pages/about/index.vue')
  }, 
  {
    path: '/aboutView',
    name: 'AboutView',
    component: () => import('@/renderer/vue/views/pages/about/view.vue')
  },
  {
    path: '/webview',
    name: 'Webview',
    component: () => import('@/renderer/vue/views/pages/webview/index.vue')
  }
];

export default Route;
