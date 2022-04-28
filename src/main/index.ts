
import { customize, opt } from '@/cfg/window.cfg';
import { customize as viewCustomize } from '@/cfg/view.cfg';
import updateCfg from '@/cfg/update.cfg';
import { appInstance, windowInstance, viewInstance,  Tray, Session, Update, logError, logOn } from "mm-electron/main";
import logo from '@/assets/icon/tray.png';
import { defaultBounds } from "@/cfg/view.cfg";
import '../preload'
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
        // 窗口
        viewInstance.setAutoResize({
            id:
                await viewInstance.createBindBV((await windowInstance.create(customize, opt) as number | bigint), viewCustomize, {}, defaultBounds) as number, autoResize: {
                    height: true,
                    width: true
                }
        })
        tary.create(logo);
    })
