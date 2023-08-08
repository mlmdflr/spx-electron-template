import { appInstance } from "@mlmdflr/electron-modules/main/app";
import { windowInstance } from "@mlmdflr/electron-modules/main/window";
import { viewInstance } from "@mlmdflr/electron-modules/main/view";
import { TrayInstance } from "@mlmdflr/electron-modules/main/tray";
import { Update } from "@mlmdflr/electron-modules/main/update";
import { Session } from "@mlmdflr/electron-modules/main/session";
import { defaultOpen } from '@mlmdflr/electron-modules/main.win32/systemInteraction'
import { ResourcesOn } from '@/main/modular/resources';
import { errorWindow, warningWindow } from '@/main/modular/result';
import { BrowserWindow, app, dialog } from 'electron';
import { customize, opt } from '@/cfg/window.cfg';
import { customize as viewCustomize } from '@/cfg/view.cfg';
import updateCfg from '@/cfg/update.cfg';
import { defaultBounds } from "@/cfg/view.cfg";
import logo from '@/assets/icon/tray.png';

//preload 监听操作
import { /* BrowserWindow,*/  ipcMain } from "electron";
/** 预加载脚本监听 **/
ipcMain.on('preload:route', (event) => {
    // console.log('from route id:'+BrowserWindow.fromWebContents(event.sender)?.customize.id);
})
//注意: 加载一些连接如果有跳转重定向操作会重置预加载 即监听两次
ipcMain.on('preload:url', (event) => {
    // console.log('from url id:'+BrowserWindow.fromWebContents(event.sender)?.customize.id);
})

//win32系统默认打开示例
ipcMain.handle('defaultOpen', async (e, _) => {
    if (process.platform === 'win32') {
        const paths = dialog.showOpenDialogSync(BrowserWindow.fromWebContents(e.sender)!, {
            properties: ['openFile']
        })
        if (paths && paths.length > 0) defaultOpen(paths[0])
    } else warningWindow(
        {
            size: 'medium',
            description: `暂时只支持win32系统哦`,
            title: '系统不支持'
        },
        e.sender
    )
})

appInstance
    .start()
    .then(async () => {
        const update = new Update(
            { provider: updateCfg.provider as any, url: updateCfg.url },
            'resources/build/cfg/app-update.yml',
            updateCfg.dirname
        );
        const session = new Session();
        update.on();
        session.on();
        ResourcesOn();

        // 调试模式
        if (!app.isPackaged) {
            try {
                import('fs').then(({ readFileSync }) => {
                    import('path').then(async ({ join }) => {
                        windowInstance.defaultLoadUrl = `http://localhost:${readFileSync(join('.port'), 'utf8')}`;
                        viewInstance.setAutoResize(
                            viewInstance.createBindBV(windowInstance.create(customize, opt), viewCustomize, {}, defaultBounds) as number,
                            {
                                height: true,
                                width: true
                            }
                        )
                        setTimeout(() => {
                            windowInstance.getMain()?.on('system-context-menu', (event, point) => {
                                console.log(point);
                            })
                        }, 300);
                    });
                });
            } catch (e) {
                throw 'not found .port';
            }
        } else viewInstance.setAutoResize(
            viewInstance.createBindBV(windowInstance.create(customize, opt), viewCustomize, {}, defaultBounds) as number,
            {
                height: true,
                width: true
            }
        )

        TrayInstance.create(logo);
    })
