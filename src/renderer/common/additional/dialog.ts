import type { OpenDialogOptions } from 'electron';

/**
 * 打开dialog
 * @param winId
 * @param params
 */
export async function openDialog(winId: number | bigint = window.customize.id as (number | bigint), params: OpenDialogOptions) {
  return window.ipc.invoke('open-dialog', { winId, params });
}
