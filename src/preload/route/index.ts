import { ipcRenderer } from 'electron';
import { isSecondInstanceWin } from '@/cfg/app.cfg'
import { preloadInit } from '@mlmdflr/electron-modules/preload';
preloadInit({ isSecondInstanceWin })
ipcRenderer.send('preload:route');