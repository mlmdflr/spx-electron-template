import type { OpenDialogOptions } from 'electron';
import customize from '@/renderer/store/customize';

/**
 * 打开dialog
 * @param winId
 * @param params
 */
export async function openDialog(winId: number | bigint = customize.get().id as (number | bigint), params: OpenDialogOptions) {
  return window.ipc.invoke('open-dialog', { winId, params });
}
