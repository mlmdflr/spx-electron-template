import type { IpcRendererEvent, BrowserViewConstructorOptions, AutoResizeOptions, Rectangle } from 'electron';

//视图消息监听
export function viewMessageOn(
    channel: string,
    listener: (event: IpcRendererEvent, args: any) => void
) {
    window.ipc.on(`view-message-${channel}-back`, listener);
}

//关闭视图消息监听
export function viewMessageRemove(channel: string) {
    window.ipc.removeAllListeners(`view-message-${channel}-back`);
}


/**
 * 指定视图消息发送
 * @param channel 监听key（保证唯一）
 * @param value 需要发送的内容
 * @param isback 是否给自身反馈(默认false)
 * @param acceptIds 指定视图id发送(
 */
export function viewMessageSend(
    channel: string, //监听key（保证唯一）
    value: any, //需要发送的内容
    isback: boolean = false, //是否给自身反馈
    acceptIds: (number)[] = [] //指定视图id发送
) {
    window.ipc.send('view-message-send', {
        channel,
        value,
        isback,
        acceptIds
    });
}

/**
 * 给所有视图发送消息
 * @param channel 监听key（保证唯一）
 * @param value 需要发送的内容
 * @param isback 是否给自身反馈(默认false)
 */
export function viewMessageSendAll(
    channel: string,
    value: any,
    isback: boolean = false,
) {
    window.ipc.send('view-message-send-all', {
        channel,
        value,
        isback
    });
}

//创建视图
export function viewCreate(customize: Customize_View, opt?: BrowserViewConstructorOptions) {
    window.ipc.invoke('view-new', { customize, opt });
}

//新建并绑定
export function viewCreateBind(wid: number | bigint, customize: Customize_View, bounds?: Rectangle, opt?: BrowserViewConstructorOptions) {
    return window.ipc.invoke('view-create-bind', { wid, customize, opt, bounds });
}

//绑定视图
export function viewBind(wid: number | bigint, id: number, bounds?: Rectangle) {
    return window.ipc.invoke('view-bind', { wid, id, bounds });
}

//视图销毁
export function viewDestroy(id: number) {
    return window.ipc.invoke('view-destroy', { id });
}

//视图解绑
export function viewUnBind(wid: number | bigint, id: number, del?: boolean) {
    return window.ipc.invoke('view-un-bind', { wid, id, del });
}


// 设置视图bounds
export function viewSetBounds(id: number = (window.customize.id as number), bounds: Rectangle) {
    window.ipc.invoke('view-set-bounds', { id, bounds });
}

//设置自动调整
export function viewSetAutoResize(id: number = (window.customize.id as number), autoResize: AutoResizeOptions) {
    window.ipc.send('view-set-auto-resize', { id, autoResize });
}