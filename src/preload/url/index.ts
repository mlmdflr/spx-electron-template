import { urlPreloadInit } from "mm-electron/preload";
import { contextBridge, ipcRenderer } from 'electron';
import { isSecondInstanceWin } from '@/cfg/app.cfg'
import css from "./css";
ipcRenderer.on('load-url', (_, args) => {
    // 挂载至window
    contextBridge.exposeInMainWorld('customize', args)
    document.body.setAttribute('platform', process.platform);
})

urlPreloadInit({isSecondInstanceWin})

//注入css
const style = window.document.createElement("style");
style.setAttribute("from", "preload.url")
style.innerHTML = css
let index = 0
const id = setInterval(() => {
    index++; if (index === 10) clearInterval(id);
    window.document.getElementsByTagName('head')[0] && window.document.getElementsByTagName('head')[0].appendChild(style) && clearInterval(id)
}, 200)

ipcRenderer.send('preload:url');