import { ipcRenderer } from 'electron';
import { isSecondInstanceWin } from '@/cfg/app.cfg'
import { preloadInit } from 'mm-electron/preload';
preloadInit({ isSecondInstanceWin })
ipcRenderer.send('preload:route');