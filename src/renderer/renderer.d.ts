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

declare module '*.vue' {
  import { ComponentPublicInstance, defineComponent, Ref } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
  global {
    namespace JSX {
      interface ElementClass {
        $props: {}
      }
      // @ts-ignore
      interface ElementAttributesProperty {
        $props: {}
      }

      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      type IntrinsicElements = IntrinsicElementsHTML & IntrinsicElementsSVG & {
        // allow arbitrary elements
        [name: string]: any
      };

      interface IntrinsicAttributes extends ReservedProps { }

      //@ts-ignore
      type ReservedProps = {
        key?: string | number | symbol
        ref?: string | Ref | ((ref: Element | ComponentPublicInstance | null, refs: Record<string, any>) => void)
        ref_for?: boolean
        ref_key?: string
        [name: string]: any
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