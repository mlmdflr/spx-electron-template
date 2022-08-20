import { ipcRenderer } from 'electron';
import { isSecondInstanceWin } from '@/cfg/app.cfg'
import { preloadInit } from '@mlmdflr/electron-modules/preload/sandbox';
preloadInit({ isSecondInstanceWin })
ipcRenderer.send('preload:route');