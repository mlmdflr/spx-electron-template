import { IpcRendererEvent } from "electron";

/**
 * 路由模式 初始化 (i)
 * */
export function LoadRoute(listener: (event: IpcRendererEvent, args: Customize_Route | Customize_View_Route) => void) {
    window.ipc.on(`load-route`, listener);
}

/**
 * 数据更新
 */
export function customizeUpdate() {
    if ('session' in window.customize) window.ipc.send('view-update', window.customize)
    else window.ipc.send('window-update', window.customize);
}

/**
 * 设置背景颜色
 */
export function windowSetBackgroundColor(id: number | bigint = window.customize.id as number | bigint, color?: string) {
    if ( 'session' in window.customize) typeof id === 'number' && window.ipc.send('view-bg-color-set', { id, color });
    else window.ipc.send('window-bg-color-set', { id, color });
}