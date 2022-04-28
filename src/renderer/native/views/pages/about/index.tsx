import Router from '@/renderer/native/router';
import style from './style';

export default class About {
  render() {
    return (
      <div class={style}>
        <div class="test">关于</div>
        <button onClick={() => Router.replace('/home')}>首页</button>
      </div>
    );
  }
}
