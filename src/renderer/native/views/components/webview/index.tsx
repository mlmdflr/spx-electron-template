import { headStore } from '@/renderer/native/store';
import { windowShow, windowMessageOn } from 'mm-electron/renderer';
import style from './style';

export default class {
  onLoad() {
    windowMessageOn((_, args) => {
      console.log('msg', args);
    });
  }
  onReady() {
    windowShow();
  }

  render() {
    const webview = document.createElement('webview');
    webview.allowpopups = true;
    webview.addEventListener('page-title-updated', () =>
      headStore.actions.setTitle(webview.getTitle())
    );
    webview.innerText = 'loading..';
    console.log(window.customize.data.url);
    webview.src = window.customize.data.url as string;
    return <div class={style}>{webview}</div>;
  }
}
