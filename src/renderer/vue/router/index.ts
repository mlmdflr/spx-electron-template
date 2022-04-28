import { createRouter, createWebHashHistory } from 'vue-router';
import { customizeUpdate } from 'mm-electron/renderer';

import pageRoute from '@/renderer/vue/router/modular/page';
import dialogRoute from '@/renderer/vue/router/modular/dialog';

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [...pageRoute, ...dialogRoute]
});

Router.beforeEach((to, from) => {
  if (to.path !== window.customize.route) {
    //更新窗口路由
    window.customize.route = to.path;
    customizeUpdate();
  }
});

export default Router;