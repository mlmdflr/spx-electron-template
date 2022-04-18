import { app, AutoResizeOptions, BrowserView, BrowserWindow, ipcMain, session } from "electron";
import { join } from "path";
import type { BrowserViewConstructorOptions, LoadFileOptions, LoadURLOptions, Rectangle } from "electron";
import Window from './window';
import { defaultBounds } from "../../cfg/view.cfg";
import { logError } from "./general/log";

function browserViewInit(
    customize: Customize_View,
    args: BrowserViewConstructorOptions = {}
) {
    const isLocal = 'route' in customize;
    const sesIsPersistence = customize.session.persistence ?? false
    const sesCache = customize.session.cache ?? false
    const sesKey = sesIsPersistence ? `persist:${customize.session.key}` : `${customize.session.key}`
    let opt: BrowserViewConstructorOptions = Object.assign(args, {
        webPreferences: {
            preload: isLocal ? join(__dirname, '../preload/index.route.js') : join(__dirname, '../preload/index.url.js'),
            contextIsolation: true,
            nodeIntegration: false,
            devTools: !app.isPackaged,
            webSecurity: false,
            session: session.fromPartition(sesKey, { cache: sesCache })
        }
    });
    const view = new BrowserView(opt);
    customize.id = view.webContents.id;
    view.customize = customize;
    View.getInstance().setMap(`${customize.id}`, view)
    // view 内创建
    // view.webContents.setWindowOpenHandler((_) => ({
    //   action: 'allow',
    //   overrideBrowserWindowOptions: opt
    // }));
    return view;
}


async function load(view: BrowserView) {
    // 注入初始化代码
    view.webContents.on('did-finish-load', () => {
        if ('route' in view.customize) view.webContents.send(`load-route`, view.customize)
        else view.webContents.send(`load-url`, view.customize)
    });
    //页面加载
    if ('route' in view.customize && view.customize.baseUrl) {
        if (view.customize.baseUrl.startsWith('https://') || view.customize.baseUrl.startsWith('http://'))
            return view.webContents.loadURL(view.customize.baseUrl, view.customize.loadOptions as LoadURLOptions);
        return view.webContents.loadFile(view.customize.baseUrl, view.customize.loadOptions as LoadFileOptions);
    } else if ('url' in view.customize && view.customize.url) {
        if (view.customize.url.startsWith('https://') || view.customize.url.startsWith('http://'))
            return view.webContents.loadURL(view.customize.url, view.customize.loadOptions as LoadURLOptions);
        return view.webContents.loadFile(view.customize.url, view.customize.loadOptions as LoadFileOptions);
    } else throw new Error(`load url error`)
}


class View {
    private static instance: View;

    private view_map: Map<string, BrowserView>

    static getInstance() {
        if (!View.instance) View.instance = new View();
        return View.instance;
    }

    constructor() { this.view_map = new Map() }

    /**
     * 创建視圖
     */
    create = (customize: Customize_View, opt: BrowserViewConstructorOptions) => {
        const view = browserViewInit(customize, opt);
        if (!app.isPackaged) {
            import('fs').then(({ readFileSync }) => {
                view?.webContents.openDevTools({ mode: 'detach' });
                if ('route' in view.customize) view.customize.baseUrl = `http://localhost:${readFileSync(join('.port'), 'utf8')}`;
                load(view)
                    .catch((error) => console.error(`load error`, error))
            });
            return view;
        }
        if ('route' in view.customize) view.customize.baseUrl = join(__dirname, '../renderer/index.html');
        load(view)
            .catch((error) => logError(`load error`, error))
        return view;
    }

    setBounds = (id: number, bounds: Rectangle) => {
        let view = this.hasMap(`${id}`) && this.getMap(`${id}`)
        view && view.customize.mount && view.setBounds(bounds)
    }

    /**
     * 設置背景顔色
     */
    setBackgroundColor = (args: { id: number; color: string }) => {
        const view = this.getMap(`${args.id}`);
        if (!view) {
            console.error('Invalid id,', args.id);
            return;
        }
        view.setBackgroundColor(args.color);
    }

    /**
     * 設置自動調整大小
     */
    setAutoResize = (args: { id: number; autoResize: AutoResizeOptions }) => {
        const view = this.getMap(`${args.id}`);
        if (!view) {
            console.error('Invalid id,', args.id);
            return;
        }
        view.setAutoResize(args.autoResize)
    }

    getMap = (key: string) => this.view_map.get(key)

    setMap = (key: string, view: BrowserView) => this.view_map.set(key, view)

    hasMap = (key: string) => this.view_map.has(key)

    delMap = (key: string) => this.view_map.delete(key)

    unBindBV = (win: BrowserWindow, view: BrowserView | BrowserView[], del: boolean = false) => {
        let err = new Error(`BrowserWindow unbind error`)
        switch (win.customize.viewType) {
            case 'Multiple':
                if (!('customize' in view)) {
                    let prViews = win.getBrowserViews()
                    let vids = view.filter(view => (view.customize)).map((view) => view.customize.id)
                    //@ts-ignore
                    for (const v of prViews) v.customize && vids.includes(v.customize.id) && v.customize.mount && !(v.customize.mount = false) && win.removeBrowserView(v) && del && this.delMap(`${v.customize.id}`) && v.webContents.destroy()
                }
                break;
            case 'Single':
                if (!('customize' in view)) throw err
                break;
            default:
                console.error(err.message);
                throw err
        }
        let prView = win.getBrowserView()
        //@ts-ignore
        'customize' in view && prView && prView.customize && prView.customize.mount && prView.customize.id === view.customize.id && !(prView.customize.mount = false) && win.setBrowserView(null) && del && this.delMap(`${prView.customize.id}`) && prView.webContents.destroy()
    };

    bindBV = (win: BrowserWindow, view: BrowserView, bounds?: Rectangle) => {
        this.unBindBV(win, view)
        let err = new Error(`this BrowserWindow cannot bind`)
        if (win.customize && win.customize.viewType) switch (win.customize.viewType) {
            case 'Single':
                win.setBrowserView(view)
                view.customize.mount = true
                break;
            case 'Multiple':
                win.addBrowserView(view)
                view.customize.mount = true
                break
            default:
                console.error(err.message);
                throw err
        } else {
            console.error(err.message);
            throw err
        }
        !bounds && this.setBounds(view.customize.id as number, defaultBounds)
        bounds && this.setBounds(view.customize.id as number, bounds)
    };

    createBindBV = (winId: bigint | number, customize: Customize_View, opt: BrowserViewConstructorOptions = {}, bounds?: Rectangle) => {
        let win = Window.get(winId)
        if (!win) throw Error('Invalid id, the id can not be a empty')
        let view = this.create({ ...customize, mount: false }, opt)
        this.bindBV(win, view, bounds)
        return view.customize.id
    };

    on() {
        //创建视图
        ipcMain.handle('view-new', (_, args) => this.create(args.customize, args.opt).customize.id)

        //视图绑定 
        ipcMain.handle('view-bind', (_, args) => {
            const view = this.getMap(`${args.id}`);
            const win = Window.get(args.wid)
            if (!view || !win) {
                console.error('Invalid id, the id can not be a empty');
                return;
            }
            let bounds = args.bounds
            if (!bounds) bounds = defaultBounds
            this.bindBV(win, view, bounds)
        })

        //视图解绑
        ipcMain.handle('view-un-bind', (_, args) => {
            const win = Window.get(args.wid)
            const view = this.getMap(`${args.id}`)
            if (!win || !view) {
                console.error('Invalid id, the id can not be a empty');
                return;
            }
            this.unBindBV(win, view, args.del)
        })

        //视图销毁
        ipcMain.handle('view-destroy', (event, args) => {
            const view = this.getMap(`${args.id}`);
            if (!view) {
                console.error('Invalid id,', args.id);
                return;
            }
            //@ts-ignore
            view.webContents.destroy();
            return this.delMap(`${args.id}`);
        })

        //设置 bounds
        ipcMain.handle('view-set-bounds', (_, args) => this.setBounds(args.id, args.bounds))

        //创建并绑定
        ipcMain.handle('view-create-bind', (_, args) => this.createBindBV(args.wid, args.customize, args.opt, args.bounds))

        //view数据更新
        ipcMain.on('view-update', (event, args) => {
            if (args.id !== undefined && args.id !== null) {
                const view = this.getMap(args.id);
                if (!view) {
                    console.error('Invalid id, the id can not be a empty');
                    return;
                }
                view.customize = args;
            }
        });

        //设置背景颜色
        ipcMain.on('view-bg-color-set', (_, args) => this.setBackgroundColor(args))

        //设置是否自动调整大小
        ipcMain.on('view-set-auto-resize', (_, args) => this.setAutoResize(args))

        //view消息(指定发送)
        ipcMain.on('view-message-send', (event, args) => {
            let originId = event.sender.id
            if (args.acceptIds && args.acceptIds.length > 0) {
                for (let i of args.acceptIds) {
                    let view = this.getMap(`${i}`)
                    if (view && i !== `${originId}`) view.webContents.send(`view-message-${args.channel}-back`, args.value);
                }
            }
            if (args.isback) {
                let view = this.getMap(`${originId}`)
                if (view) view.webContents.send(`view-message-${args.channel}-back`, args.value);
            }
        });

        //窗口消息(全部发送)
        ipcMain.on('view-message-send-all', (event, args) => {
            let originId = event.sender.id
            for (let [key, value] of this.view_map) if (key !== `${originId}`) value.webContents.send(`window-message-${args.channel}-back`, args.value);
            if (args.isback) {
                let view = this.getMap(`${originId}`)
                if (view) view.webContents.send(`view-message-${args.channel}-back`, args.value);
            }
        });
    }
}

export default View.getInstance();