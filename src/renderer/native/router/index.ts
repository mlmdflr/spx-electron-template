import pageRoute from '@/renderer/native/router/modular/page';
import { Router } from '@youliso/web-modules';
import { customizeUpdate } from '@mlmdflr/electron-modules/renderer/base';

const router = new Router('inner', [...pageRoute]);

router.onBeforeRoute = (route) => {
  window.customize.route = route.path;
  customizeUpdate();
  return true;
};

router.onAfterRoute = (route) => { };

export default router;
