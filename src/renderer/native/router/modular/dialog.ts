import { Route } from 'ym-web/types';

const Router: Route[] = [
  {
    path: '/message',
    component: () => import('@/renderer/native/views/dialog/message/index')
  }
];

export default Router;
