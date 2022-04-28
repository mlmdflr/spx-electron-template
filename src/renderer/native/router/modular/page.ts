import webview from '@/renderer/native/views/components/webview/index';
import home from '@/renderer/native/views/pages/home/index';
import { Route } from 'ym-web/types';

const Router: Route[] = [
  {
    path: '/Webview',
    component: webview
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/about',
    component: () => import('@/renderer/native/views/pages/about/index')
  },
  {
    path: '/music',
    instance: true,
    component: () => import('@/renderer/native/views/pages/music/index')
  }
];

export default Router;
