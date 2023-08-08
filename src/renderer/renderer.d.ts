interface AnyObject {
  [key: string]: any;
}

interface Window {
  customize: import('@mlmdflr/electron-modules/types').Customize_Route | import('@mlmdflr/electron-modules/types').Customize_View_Route;
}

interface HeadEvent {
  minShow: boolean
  maxShow: boolean
  closeShow: boolean
  disable: boolean
}

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg';
declare module '*.png';
declare module '*.ico';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';