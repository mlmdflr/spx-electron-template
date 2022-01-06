import { RouteRecordRaw } from 'vue-router';

const Route: RouteRecordRaw[] = [
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/renderer/views/dialog/message/index.vue')
  },
  {
    path: '/update',
    name: 'Update',
    component: () => import('@/renderer/views/dialog/update/index.vue')
  }
];

export default Route;
