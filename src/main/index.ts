import App from './modular/app';
import Window from './modular/window';
import View from './modular/view';
import Global from './modular/general/global';
import Tray from './modular/additional/tray';
import { logOn } from './modular/general/log';
import { pathOn } from './modular/general/path';
import { fileOn } from './modular/general/file';
import Shortcut from "./modular/enhance/shortcut";
import { customize, opt } from '@/cfg/window.cfg';
import { customize as viewCustomize } from '@/cfg/view.cfg';

import Session from './modular/general/session';
import Dialog from './modular/additional/dialog';
import Menu from './modular/additional/menu';
import Update from './/modular/enhance/update';

import '../preload'

App.start().then(async () => {

    // 主要模块
    Global.on();//全局模块
    Window.on();//窗口模块
    View.on();//视图模块
    Shortcut.on();//快捷键模块
    Tray.on();//托盘模块
    logOn();//日志模块

    // 可选模块
    fileOn();//文件模块
    pathOn();//路径模块

    App.use([Session, Dialog, Menu, Update]);
    // 窗口

    View.setAutoResize({
        id:
            View.createBindBV((Window.create(customize, opt) as number | bigint), viewCustomize) as number, autoResize: {
                height: true,
                width: true
            }
    })

    // 托盘
    Tray.create();
})
