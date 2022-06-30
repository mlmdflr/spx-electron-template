import type { Rectangle } from "electron";
import { Customize_View_Route } from "@mlmdflr/electron-modules/types";

export const customize: Customize_View_Route = {
    route: "/about",
    session: {
        key: 'mlmdflr',
        persistence: true
    }
};

// 默认相对位置
export const defaultBounds: Rectangle = {
    x: 0,
    y: 260,
    width: 800,
    height: 340,
}

export default {
    customize,
    defaultBounds
}