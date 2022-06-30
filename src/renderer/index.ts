import { createApp } from 'vue';
import { LoadRoute } from '@mlmdflr/electron-modules/renderer/base';
import router from '@/renderer/vue/router';
import { i18n } from '@/renderer/vue/i18n'
import { Customize_Route, Customize_View_Route } from '@mlmdflr/electron-modules/types';
import { globalComponent } from '@youliso/web-modules';

import './style'
LoadRoute((_, customize: Customize_Route | Customize_View_Route) => {
  switch (customize.rendererType) {
    case 'Native':
      window.customize = customize;
      document.body.setAttribute('platform', window.environment.platform);
      globalComponent.use(import('./native/views/components/head'), 'head');
      import('@/renderer/native/router').then((router) =>
        router.default.push(window.customize.route as string)
      );
      break;
    default:
      router.addRoute({
        path: '/',
        redirect: customize.route
      });
      window.customize = customize
      document.body.setAttribute('platform', window.environment.platform);
      import('@/renderer/vue/views/app.vue').then((app) => createApp(app.default).use(i18n).use(router).mount('#root'))
      break;
  }
});