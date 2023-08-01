import { logWrapper } from '@mlmdflr/electron-modules/main/log';

export const logError = (...val: any) => {
    logWrapper('error', undefined, val)
}

export const logWarn = (...val: any) => {
    logWrapper('warn', undefined, val)
}

export const logInfo = (...val: any) => {
    logWrapper('info', undefined, val)
}