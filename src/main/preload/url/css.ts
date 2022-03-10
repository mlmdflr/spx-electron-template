//在预加载时注入的css
export default `
*,
*:after,
*:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
*::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
}
*::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);*/
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.3);
}
*::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);*/
    background: transparent;
}
/*设置拖动*/
.pre-drag {
    -webkit-app-region: drag;
}
/*设置不可拖动*/
.pre-no-drag {
    -webkit-app-region: no-drag;
}
`