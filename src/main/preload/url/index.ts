import type { IpcRendererEvent } from 'electron';
import { contextBridge, ipcRenderer } from 'electron';
import { EOL } from 'os';
import { isSecondInstanceWin } from '@/cfg/app.json'
import sleep from '@/util/sleep'
import { Snowflake } from '@/util/snowflake'
import { net, NetOpt } from '@/renderer/common/enhance/net'
import css from "./css";

contextBridge.exposeInMainWorld('ipc', {
    send: (channel: string, args?: any) => ipcRenderer.send(channel, args),
    sendSync: (channel: string, args?: any) => ipcRenderer.sendSync(channel, args),
    on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on(channel, listener),
    once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.once(channel, listener),
    invoke: (channel: string, args: any) => ipcRenderer.invoke(channel, args),
    removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel)
});

contextBridge.exposeInMainWorld('environment', {
    EOL,
    systemVersion: process.getSystemVersion(),
    platform: process.platform,
    isSecondInstanceWin
});

contextBridge.exposeInMainWorld('sleep', (duration: number, value: any) => sleep(duration, value));

contextBridge.exposeInMainWorld('snowflake', (workerId: bigint, dataCenterId: bigint) => new Snowflake(workerId, dataCenterId).nextId());

contextBridge.exposeInMainWorld('net', (url: string, param: NetOpt) => net(url, param));

//注入css
const style = window.document.createElement("style");
style.setAttribute("from","preload.url")
style.innerHTML = css
let index = 0
const id = setInterval(() => {
    index++; if (index === 10) clearInterval(id);
    window.document.getElementsByTagName('head')[0] && window.document.getElementsByTagName('head')[0].appendChild(style) && clearInterval(id)
}, 200)

ipcRenderer.send('preload:url');