
/**
 * 获取内部依赖文件路径(！文件必须都存放在lib/inside 针对打包后内部依赖文件路径问题)
 * */
export async function getInsidePath(path?: string): Promise<string> {
  return window.ipc.invoke("resources-path-get", {
    type: "inside",
    path,
  });
}

/**
 * 获取外部依赖文件路径(！文件必须都存放在lib/extern下 针对打包后外部依赖文件路径问题)
 * */
export async function getExternPath(path?: string): Promise<string> {
  return window.ipc.invoke("resources-path-get", {
    type: "extern",
    path,
  });
}

/**
 * 获取顶层依赖文件路径
 * @param path
 */
export async function getRootPath(path?: string): Promise<string> {
  return window.ipc.invoke("resources-path-get", { type: "root", path });
}

/**
 * 获取顶层平台依赖文件路径
 * @param path
 */
export async function getPlatformPath(path?: string): Promise<string> {
  return window.ipc.invoke("resources-path-get", {
    type: "platform",
    path,
  });
}