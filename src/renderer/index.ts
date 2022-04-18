import { createApp } from 'vue';
import { windowMessageOn } from '@/renderer/common/window';
import { LoadRoute } from '@/renderer/common/base';
import App from '@/renderer/views/app.vue';
import router from '@/renderer/router';
import Head from "@/renderer/views/components/head/index.vue";
import { i18n, setLanguage } from './i18n'
import { viewMessageOn } from './common/view';

LoadRoute((_, args) => {
  router.addRoute({
    path: '/',
    redirect: args.route
  });
  // 挂载至window
  window.customize = args
  args.locale && setLanguage(args.locale)
  document.body.setAttribute('platform', window.environment.platform);
  createApp(App).component('Head', Head).use(i18n).use(router).mount('#app');
});