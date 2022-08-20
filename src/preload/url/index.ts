import { urlPreloadInit } from "@mlmdflr/electron-modules/preload/sandbox";
import { contextBridge, ipcRenderer } from 'electron';
import { isSecondInstanceWin } from '@/cfg/app.cfg'


ipcRenderer.on('load-url', (_, args) => {
    // 挂载至window
    contextBridge.exposeInMainWorld('customize', args)
    document.body.setAttribute('platform', process.platform);
})

urlPreloadInit({ isSecondInstanceWin })

ipcRenderer.send('preload:url');