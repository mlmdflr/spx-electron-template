import { BrowserWindowConstructorOptions } from "electron";
import { Customize } from "@mlmdflr/electron-modules/types";

import { productName } from '../../package.json';

export const opt: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    backgroundColor: "#222"
};

export const customize: Customize = {
    title: productName,
    route: "/home",
    viewType:'Single',
    isMainWin: true
};

// 模态框的父窗体模糊半径
export const modalWindowParentBlu = '5px'

export default {
    opt,
    customize,
    modalWindowParentBlu
}