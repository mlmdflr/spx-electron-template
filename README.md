# xps-electron-vue-template

一个基于 `electron` 多窗口模式的模板 使用 ts + vue3 进行开发,
基于 youliso 大佬的架子上进行拓展
youliso传送门: https://github.com/youliso/electron-template

❗注意 `nodejs => 14.17.6 (推荐当前长期维护版本,其余版本请自测)`

## electron builder 打包配置
位于 `resources/build/cfg/build.js` 根据自己需求更改即可   
请参考 [electron-builder](https://www.electron.build/) 文档

## 模块大致文件结构参考
```
├── dist 编译后存放
├── out 打包后存放
├── resources 打包依赖文件夹
│   ├── build 打包所需的文件
│   │   ├── cfg 打包配置
│   │   └── icons 图片
│   ├── platform 对应系统依赖
│   │   ├── win32
│   │   ├── darwin
│   │   └── linux
│   ├── extern 外部依赖(打包后位于resources下)
│   ├── inside 内部依赖(如果开启asar打包 会位于asar下)
│   └── root 顶层依赖(位于安装根目录下)
├── scripts 打包的方法 、本地调试等
├── src 主目录
│   ├── cfg 本地配置 和 请求配置之类
│   ├── assets 静态资源
│   ├── util 工具类 (无外部依赖可通用)
│   ├── main 主进程
│   │   └── modular 主进程模块
│   │       ├─── additional 附加模块
│   |       ├─── enhance 增强模块
│   |       ├─── general 通用模块
│   |       └─── app 应用相关
│   |       └─── window 窗口相关
│   └── renderer 渲染进程
│       └── common 渲染进程模块(同主进程 modular)
├── .port 调试端口
└── tsconfig.json ts配置
```

### 安装中的网络问题
- `electron`:
```shell
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
```

## 运行调试
运行命令
```shell
yarn run dev
```

## 打包发布

运行命令

```shell
yarn build win|win32|win64|winp|winp32|winp64|darwin|mac|linux
```

