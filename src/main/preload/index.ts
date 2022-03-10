import { /* BrowserWindow,*/  ipcMain } from "electron";

/** 预加载脚本监听 **/

ipcMain.on('preload:route', (event) => {
    // console.log('from route id:'+BrowserWindow.fromWebContents(event.sender)?.customize.id);
})


//注意: 加载一些连接如果有跳转重定向操作会重置预加载 即监听两次
ipcMain.on('preload:url', (event) => {
    // console.log('from url id:'+BrowserWindow.fromWebContents(event.sender)?.customize.id);
})