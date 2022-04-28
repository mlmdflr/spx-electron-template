import pageRoute from '@/renderer/native/router/modular/page';
import dialogRoute from '@/renderer/native/router/modular/dialog';
import { Router } from 'ym-web';
import { customizeUpdate } from 'mm-electron/renderer';

const router = new Router('inner', [...pageRoute, ...dialogRoute]);

router.onBeforeRoute = (route) => {
  window.customize.route = route.path;
  customizeUpdate();
  return true;
};

router.onAfterRoute = (route) => {};

export default router;
