interface Customize_Base {
  // 唯一id
  id?: number | bigint;
  // 参数数据
  loadOptions?: Electron.LoadURLOptions | Electron.LoadFileOptions;
  // 父类窗口宽度
  currentWidth?: number;
  // 父类窗口高度
  currentHeight?: number;
  // 自定义参数
  data?: any;
}

type ViewType =
  | 'None'
  | 'Single'
  | 'Multiple'

type Customize_Window_Base = Customize_Base & {
  // 父类窗口是否全屏
  currentMaximized?: boolean;
  // 是否主窗口(当为true时会替代当前主窗口)
  isMainWin?: boolean;
  // 附加 BrowserView 類別
  viewType?: ViewType;
  // 父窗口id
  parentId?: number | bigint;
  // 进程参数
  argv?: any;
}

type Customize_Route = Customize_Window_Base & {
  // 标题 (仅路由下生效)
  title?: string;
  // 指定路由
  route: string;
  // 根url
  baseUrl?: string;
  // 放开一路一窗限制
  isOpenMultiWindow?: boolean;
  // 語言
  locale?: string
}

type Customize_Url = Customize_Window_Base & {
  // 指定网页
  url: string;
}

type Customize = Customize_Route | Customize_Url

type Customize_View_Base = Customize_Base & {
  // 唯一id
  id?: number;
  // 会话
  session: {
    // 区分会话的key
    key: string;
    // 是否开启缓存
    cache?: boolean;
    // 是否持久化会话
    persistence?: boolean;
  }
  mount?: boolean
}

type Customize_View_Omit =
  | 'id'
  | 'currentWidth'
  | 'currentHeight'
  | 'currentMaximized'
  | 'viewType'
  | 'isMainWin'
  | 'parentId'
  | 'argv'

type Customize_View_Route = Customize_View_Base & Omit<Customize_Route, Customize_View_Omit>

type Customize_View_Url = Customize_View_Base & Omit<Customize_Url, Customize_View_Omit>

type Customize_View = Customize_View_Route | Customize_View_Url


declare namespace Electron {
  interface BrowserWindow {
    customize: Customize;
  }
  interface BrowserView {
    customize: Customize_View;
  }
}

interface AppInfo {
  isPackaged: boolean;
  name: string;
  version: string;
}

type AppPathKey = 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'

type WindowAlwaysOnTopOpt =
  | 'normal'
  | 'floating'
  | 'torn-off-menu'
  | 'modal-panel'
  | 'main-menu'
  | 'status'
  | 'pop-up-menu'
  | 'screen-saver';

type WindowFuncOpt = 'close' | 'hide' | 'show' | 'minimize' | 'maximize' | 'restore' | 'reload';

type WindowStatusOpt =
  | 'isMaximized'
  | 'isMinimized'
  | 'isFullScreen'
  | 'isAlwaysOnTop'
  | 'isVisible'
  | 'isFocused'
  | 'isModal';

interface UpdateMessage {
  code: number;
  msg: string;
  value?: any;
}

interface SocketMessage {
  code: number;
  msg?: string;
  value?: any;
}