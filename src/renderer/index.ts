import { createApp } from 'vue';
import { windowLoad, windowMessageOn } from '@/renderer/common/window';
import App from '@/renderer/views/app.vue';
import router from '@/renderer/router';
import Head from "@/renderer/views/components/head/index.vue";
import { i18n, setLanguage } from './i18n'

windowLoad((_, args) => {
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

windowMessageOn('renderer-i18n-language-change', (_, args) => {
  window.customize.locale = args
  setLanguage(args)
})