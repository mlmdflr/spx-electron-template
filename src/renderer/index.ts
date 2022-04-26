import { createApp } from 'vue';
import { LoadRoute } from 'mm-electron/renderer';
import App from '@/renderer/views/app.vue';
import router from '@/renderer/router';
import Head from "@/renderer/views/components/head/index.vue";
import { i18n } from './i18n'

LoadRoute((_, args) => {
  router.addRoute({
    path: '/',
    redirect: args.route
  });
  // 挂载至window
  window.customize = args
  document.body.setAttribute('platform', window.environment.platform);
  createApp(App).component('Head', Head).use(i18n).use(router).mount('#app');
});