import { appInstance } from "@mlmdflr/electron-modules/main/app";
import { windowInstance } from "@mlmdflr/electron-modules/main/window";
import { viewInstance } from "@mlmdflr/electron-modules/main/view";
import { TrayInstance } from "@mlmdflr/electron-modules/main/tray";
import { Update } from "@mlmdflr/electron-modules/main/update";
import { Session } from "@mlmdflr/electron-modules/main/session";
import { app, } from 'electron';
import { ResourcesOn } from '@/main/modular/resources';
import { customize, opt } from '@/cfg/window.cfg';
import { customize as viewCustomize } from '@/cfg/view.cfg';
import updateCfg from '@/cfg/update.cfg';
import { defaultBounds } from "@/cfg/view.cfg";
import logo from '@/assets/icon/tray.png';
import '../preload'
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
                            await viewInstance.createBindBV((await windowInstance.create(customize, opt) as number | bigint), viewCustomize, {}, defaultBounds) as number,
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
            await viewInstance.createBindBV((await windowInstance.create(customize, opt) as number | bigint), viewCustomize, {}, defaultBounds) as number,
            {
                height: true,
                width: true
            }
        )




        TrayInstance.create(logo);
    })
