import { windowInstance } from "@mlmdflr/electron-modules/main/window";
import { WebContents, BrowserWindow } from "electron";

interface resultProps {
    description?: string
    size: 'small' | 'medium' | 'large' | 'huge'
    status: 'info' | 'success' | 'warning' | 'error'
    title?: string
}

export const infoWindow = function (rp: Omit<resultProps, 'status'> = { size: 'medium' }, sender?: WebContents) {
    if (sender) {
        const win = BrowserWindow.fromWebContents(sender)
        windowInstance.create(
            {
                route: '/result',
                title: '提示',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'info',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    } else {
        const win = windowInstance.getMain()
        windowInstance.create(
            {
                route: '/result',
                title: '提示',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'info',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    }
}

export const successWindow = function (rp: Omit<resultProps, 'status'> = { size: 'medium' }, sender?: WebContents) {
    if (sender) {
        const win = BrowserWindow.fromWebContents(sender)
        windowInstance.create(
            {
                route: '/result',
                title: '成功',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'success',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    } else {
        const win = windowInstance.getMain()
        windowInstance.create(
            {
                route: '/result',
                title: '成功',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'success',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    }
}

export const warningWindow = function (rp: Omit<resultProps, 'status'> = { size: 'medium' }, sender?: WebContents) {
    if (sender) {
        const win = BrowserWindow.fromWebContents(sender)
        windowInstance.create(
            {
                route: '/result',
                title: '警告',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'warning',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    } else {
        const win = windowInstance.getMain()
        windowInstance.create(
            {
                route: '/result',
                title: '警告',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'warning',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    }
}

export const errorWindow = function (rp: Omit<resultProps, 'status'> = { size: 'medium' }, sender?: WebContents) {
    if (sender) {
        const win = BrowserWindow.fromWebContents(sender)
        windowInstance.create(
            {
                route: '/result',
                title: '错误',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'error',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    } else {
        const win = windowInstance.getMain()
        windowInstance.create(
            {
                route: '/result',
                title: '错误',
                data: {
                    description: rp.description,
                    size: rp.size,
                    status: 'error',
                    title: rp.title
                },
                parentId: win?.customize.id
            },
            {
                width: win ? win.getSize()[0] * 0.8 : undefined,
                height: win ? win.getSize()[1] * 0.8 : undefined,
                modal: true
            }
        )
    }
}