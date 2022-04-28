interface AnyObject {
  [key: string]: any;
}

interface Window {
  customize: import('mm-electron/types').Customize_Route | import('mm-electron/types').Customize_View_Route;
}

interface HeadEvent {
  minShow: boolean
  maxShow: boolean
  closeShow: boolean
  disable: boolean
}

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
  global {
    namespace JSX {
      interface ElementClass {
        $props: {}
      }
      interface ElementAttributesProperty {
        $props: {}
      }
      interface IntrinsicAttributes extends ReservedProps { }

      type ReservedProps = {
        key?: string | number | symbol
        ref?:
        | string
        | any
      }
    }
  }
}

declare module '*.svg';
declare module '*.png';
declare module '*.ico';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';