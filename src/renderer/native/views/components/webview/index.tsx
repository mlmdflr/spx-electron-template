import { headStore } from '@/renderer/native/store';
import { windowShow } from 'mm-electron/renderer/window';
import style from './style';

export default class {
  onLoad() {
    
  }
  onReady() {
    windowShow();
  }
  render() {
    const webview = document.createElement('webview');
    webview.allowpopups = true;
    webview.addEventListener('page-title-updated', () => {
      headStore.actions.setTitle(webview.getTitle())
    });
    webview.innerText = 'loading..';
    if ('toUrl' in window.customize && window.customize['toUrl']) {
      webview.src = window.customize['toUrl'] as string;
    } else webview.src = 'https://mlmdflr.cc/404.html'
    return <div class={style}>{webview}</div>;
  }
}
