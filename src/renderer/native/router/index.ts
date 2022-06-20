import pageRoute from '@/renderer/native/router/modular/page';
import { Router } from 'ym-web/router';
import { customizeUpdate } from 'mm-electron/renderer/base';

const router = new Router('inner', [...pageRoute]);

router.onBeforeRoute = (route) => {
  window.customize.route = route.path;
  customizeUpdate();
  return true;
};

router.onAfterRoute = (route) => { };

export default router;
