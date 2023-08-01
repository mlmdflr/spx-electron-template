const fs = require('fs');
const path = require('path');
const v8 = require('v8');
const bytenode = require('bytenode');
v8.setFlagsFromString('--no-lazy');

const codePath = path.join('./dist'); // 编译目录
const ignorePath = 'preload,renderer'; // 编译忽略规则

module.exports = async () => {
  console.info('[Build]', 'bytecode build start.', '\n');
  await buildDir(codePath);
  console.info('[Build]', 'bytecode build success.', '\n');
  // 遍历构建
  async function buildDir(dir) {
    const ignorePathList = (ignorePath || '').split(',');
    const files = fs.readdirSync(dir);

    for (let file of files) {
      const filePath = path.join(dir, file);

      // 检查文件是否在忽略列表
      for (const key in ignorePathList) {
        const name = ignorePathList[key];
        if (path.parse(name).base === file) {
          console.warn(`[Skip] ${filePath} hit ignore rule`);
          return;
        }
      }

      try {
        const fileInfo = fs.statSync(filePath);
        if (fileInfo.isDirectory()) {
          // 是文件夹
          await buildDir(filePath);
        } else {
          // 是文件
          await buildFile(filePath);
        }
      } catch (error) {
        console.warn(`[Skip Build] ${filePath}`, error);
      }
    }
  }
  // 构建 bytecode 文件
  async function buildFile(source) {
    const fileNameInfo = path.parse(source);
    if (fileNameInfo.ext == '.jsc') {
      console.warn('[Build]', `${source} it has been compiled.`);
      return;
    }

    await bytenode.compileFile({
      electron: true,
      filename: source,
      output: `${fileNameInfo.dir}/${fileNameInfo.name}.jsc`
    });
    bytenode.addLoaderFile(`${fileNameInfo.dir}/${fileNameInfo.name}.jsc`, `${fileNameInfo.base}`);

    console.info('[Build] success', source);
  }
};
