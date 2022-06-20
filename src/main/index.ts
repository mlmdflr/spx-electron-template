
import { customize, opt } from '@/cfg/window.cfg';
import { customize as viewCustomize } from '@/cfg/view.cfg';
import updateCfg from '@/cfg/update.cfg';
import { appInstance } from "mm-electron/main/app";
import { windowInstance } from "mm-electron/main/window";
import { viewInstance } from "mm-electron/main/view";
import { Tray } from "mm-electron/main/tray";
import { Update } from "mm-electron/main/update";
import { Session } from "mm-electron/main/session";
import logo from '@/assets/icon/tray.png';
import { defaultBounds } from "@/cfg/view.cfg";
import '../preload'
import { app } from 'electron';
appInstance
    .start()
    .then(async () => {
        const tary = new Tray();
        const update = new Update(
            { provider: updateCfg.provider as any, url: updateCfg.url },
            'resources/build/cfg/app-update.yml',
            updateCfg.dirname
        );
        const session = new Session();
        update.on();
        session.on();

        // 调试模式
        if (!app.isPackaged) {
            try {
                import('fs').then(({ readFileSync }) => {
                    import('path').then(async ({ join }) => {
                        windowInstance.loadUrl = `http://localhost:${readFileSync(join('.port'), 'utf8')}`;
                        viewInstance.setAutoResize({
                            id:
                                await viewInstance.createBindBV((await windowInstance.create(customize, opt) as number | bigint), viewCustomize, {}, defaultBounds) as number, autoResize: {
                                    height: true,
                                    width: true
                                }
                        })
                    });
                });
            } catch (e) {
                throw 'not found .port';
            }
        } else viewInstance.setAutoResize({
            id:
                await viewInstance.createBindBV((await windowInstance.create(customize, opt) as number | bigint), viewCustomize, {}, defaultBounds) as number, autoResize: {
                    height: true,
                    width: true
                }
        })

        tary.create(logo);
    })
