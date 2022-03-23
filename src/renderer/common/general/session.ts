import type { CookiesGetFilter, CookiesSetDetails } from 'electron';
import type { treatedBytes } from "@/util/net";

/**
 * 设置http/https指定域名请求头
 * 键值对 => 域名: Headers
 */
export function sessionHeadersSet(args: { [key: string]: { [key: string]: string } }) {
  window.ipc.send('session-headers-set', args);
}

/**
 * 获取 cookies
 * @param args
 */
export function sessionCookiesGet(args: CookiesGetFilter) {
  return window.ipc.invoke('session-cookies-get', args);
}

/**
 * 设置 cookies
 * @param args
 */
export function sessionCookiesSet(args: CookiesSetDetails) {
  return window.ipc.invoke('session-cookies-set', args);
}

/**
 * 移除 Cookies
 * @param url
 * @param name
 */
export function sessionCookiesRemove(url: string, name: string) {
  return window.ipc.invoke('session-cookies-remove', { url, name });
}

/**
 * 获取缓存大小
 */
export function sessionCacheSize(): Promise<treatedBytes> {
  return window.ipc.invoke('session-cache-size');
}

/**
 * 清除缓存 
 */
export function sessionCacheClear() {
  window.ipc.invoke('session-cache-clear');
}