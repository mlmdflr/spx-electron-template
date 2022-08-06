import { injectGlobal } from '@emotion/css/macro';

injectGlobal`
:root {
  --red: #e54d42;
  --orange: #f37b1d;
  --yellow: #fbbd08;
  --olive: #8dc63f;
  --green: #39b54a;
  --cyan: #1cbbb4;
  --blue: #0081ff;
  --purple: #6739b6;
  --mauve: #9c26b0;
  --pink: #e03997;
  --brown: #a5673f;
  --grey: #8799a3;
  --black: #333333;
  --dark: #1e1e1e;
  --darkGray: #666666;
  --gray: #aaaaaa;
  --ghostWhite: #f1f1f1;
  --white: #ffffff;
}
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}

*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);*/
  background: transparent;
}

body{ 
  background:#222;color:var(--white);
}

html,
body,
#root,
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  user-select: none;
}
input,
button,
select {
  border: none;
  outline: none;
  margin: 0;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
}
button {
  &:hover {
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 0.1)),
      to(rgba(0, 0, 0, 0.1))
    );
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }
  &:active {
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 0.2)),
      to(rgba(0, 0, 0, 0.2))
    );
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
}
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
.user-select-text {
  user-select: text;
}
`;
