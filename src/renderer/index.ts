import { createApp } from 'vue';
import { LoadRoute } from '@mlmdflr/electron-modules/renderer/base';
import router from '@/renderer/router';
import { i18n } from '@/renderer/i18n'
import { Customize_Route, Customize_View_Route } from '@mlmdflr/electron-modules/types';

import './style'

LoadRoute((_, customize: Customize_Route | Customize_View_Route) => {
  router.addRoute({
    path: '/',
    redirect: customize.route
  });
  window.customize = customize
  document.body.setAttribute('platform', window.environment.platform);
  import('@/renderer/views/app.vue').then((app) => createApp(app.default).use(i18n).use(router).mount('#root'))
});