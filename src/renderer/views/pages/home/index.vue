<script setup lang="ts">
import type { IpcRendererEvent } from 'electron';
import { onMounted, onUnmounted, Ref, ref, unref, watch, defineComponent, createApp, createVNode, VNode, render } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import customize from '@/renderer/store/customize';
import {
  windowCreate,
  windowShow,
  windowMessageOn,
  windowMessageRemove,
  windowBlurFocusOn
} from '@/renderer/common/window';

import { menuShow, menuOn, menuListenersRemove } from '@/renderer/common/additional/menu';

import { NNotificationProvider, NMessageProvider, useMessage, useNotification, NButton, NGrid, NGi, NSpace, NSwitch, NotificationApi, MessageApi } from 'naive-ui'

import { snowflake } from '@/util/snowflake';

import { getRootPath, getInsidePath, getExternPath, getPlatformPath, relaunch, launch, getGlobal, getAppInfo } from '@/renderer/common';

import HotkeyInput from '@/renderer/views/components/hotkeyInput-vue3/index.vue';

import {
  shortcutOn,
  shortcut,
  unShortcutAll,
  unShortcut,
  shortcutGetByKey
} from '@/renderer/common/enhance/shortcut';
import Router from '@/renderer/router';

const version = window.environment.systemVersion

//NotificationApi  MessageApi 初始化
type placementType = "top-left" | "top-right" | "bottom-left" | "bottom-right"
const placement: Ref<placementType> = ref('bottom-right')
const msgPlacement: Ref<placementType | 'top' | 'bottom'> = ref('top')
let notification: NotificationApi
let nmessage: MessageApi
// 对应模版中的 n-init 标签
const nInit = defineComponent({
  setup() {
    notification = useNotification()
    nmessage = useMessage()
  },
  render: () => {}
})



let auto = ref(false);

let shortcutStr = ref();
let shortcutId = ref();
/**
    * 右键menu作用域
    */
function elDom(element: Element | ComponentPublicInstance | null) {
  if (!element) return;
  (element as HTMLElement).oncontextmenu = () => {
    menuShow();
  };
}

/**
 * 右键menu事件监听
 */
menuOn((_event, args) => {
  windowCreate({
    title: '右键测试',
    route: '/message',
    parentId: customize.get().id,
    data: { text: args }
  }, {
    modal: true
  });
});

windowMessageOn('communication', (_event: IpcRendererEvent, args: any) => {
  //监听弹框测试
  console.log(args);
});



function test() {
  windowCreate(
    {
      title: '弹框测试',
      route: '/message',
      data: { text: 'wdnmd' },
      parentId: customize.get().id,
      isMainWin: true
    },
    {
      modal: true
    }
  );
}



function toAbout() {
  Router.push('/about');
}

function toRepositories() {
  windowCreate({
    id: 0,
    url: 'https://www.naiveui.com/en-US/os-theme',
    isOpenMultiWindow: true,
    loadingAnimation: true
  }, {
    width: 800,
    height: 600
  });
}

const snowflakeClick = () => {
  notification.success({
    title: '雪花算法',
    content: new snowflake(1n, 2n).nextId().toString(),
    duration: 3000
  })
}
const launchSwitch = (value: boolean) => {
  nmessage.success('成功,当前状态已经切换到' + (launch(value) ? '开启' : '关闭'))
}

const platformPathClick = async () => {
  notification.success({
    title: 'platform路径',
    content: await getPlatformPath(),
    duration: 3000
  })
}
const externPathClick = async () => {
  notification.success({
    title: 'extern路径',
    content: await getExternPath(),
    duration: 3000
  })
}
const insidePathClick = async () => {
  notification.success({
    title: 'inside路径',
    content: await getInsidePath(),
    duration: 3000
  })
}
const rootPathClick = async () => {
  notification.success({
    title: 'inside路径',
    content: await getRootPath(),
    duration: 3000
  })
}

async function rebootApp() {
  if ((await getAppInfo()).isPackaged) {
    relaunch(true);
  } else {
    nmessage.warning('dev不建议使用')
  }
}

watch(shortcutStr, async (newSId, oldSID) => {
  if (typeof unref(shortcutStr) === "string") {
    if (!newSId) {
      unShortcut((await shortcutGetByKey(oldSID))?.id as number | bigint);
      return;
    }
    if (oldSID) {
      unShortcut((await shortcutGetByKey(oldSID))?.id as number | bigint);
    }
    shortcutId.value = await shortcut(shortcutStr.value);
  } else {
    if (!shortcutStr.value || shortcutStr.value?.size === 0) {
      unShortcutAll();
      return
    }
    shortcutId.value = await shortcut(Array.from(shortcutStr.value));
  }
  shortcutOn(shortcutId.value, (_e, key) => {
    nmessage.success(`快捷键回调:${key}`);
  });
}, {
  deep: true
});


windowBlurFocusOn(async (_, args) => {
  if (args === 'blur') {
    unShortcutAll();
  } else {
    if (typeof unref(shortcutStr) === "string" || typeof unref(shortcutStr) === "undefined") {
      if (shortcutId.value) {
        shortcutId.value = await shortcut(shortcutStr.value);
        shortcutOn(shortcutId.value, (_e, key) => {
          nmessage.success(`快捷键回调:${key}`);
        });
      }
    } else {
      if (shortcutStr.value?.size !== 0) {
        shortcutId.value = await shortcut(Array.from(shortcutStr.value));
        shortcutOn(shortcutId.value, (_e, key) => {
          nmessage.success(`快捷键回调:${key}`);
        });
      }
    }
  }
});

onMounted(async () => {
  windowShow();
  auto.value = launch()
});

onUnmounted(() => {
  windowMessageRemove('test'); //关闭监听
  menuListenersRemove(); //关闭右键菜单监听
});

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
<template>
  <div class="container">
    <Head />
    <n-notification-provider :placement="placement" :max="3">
      <n-message-provider :placement="msgPlacement" :max="3">
        <n-init />
        <div :ref="elDom" class="home-info">
          <div>hello {{ version }}</div>
          <n-space>
            <n-button strong secondary type="info" @click="toAbout">关于</n-button>
            <n-button strong secondary type="info" @click="toRepositories">打开仓库</n-button>
            <n-button strong secondary type="info" @click="test">弹个框</n-button>
            <n-button strong secondary type="info" @click="snowflakeClick">雪花算法生成</n-button>
            <n-button type="warning" @click="rebootApp">重启app</n-button>
          </n-space>
          <n-grid x-gap="12" :cols="1">
            <n-gi>开机自启:</n-gi>
            <n-gi>
              <n-switch v-model="auto" @update-value="launchSwitch">
                <template #checked>开启</template>
                <template #unchecked>关闭</template>
              </n-switch>
            </n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="1">
            <n-gi>打包路径:</n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="4">
            <n-gi>
              <n-button tertiary type="info" @click="platformPathClick">platform路径</n-button>
            </n-gi>
            <n-gi>
              <n-button tertiary type="info" @click="externPathClick">extern路径</n-button>
            </n-gi>
            <n-gi>
              <n-button tertiary type="info" @click="insidePathClick">inside路径</n-button>
            </n-gi>
            <n-gi>
              <n-button tertiary type="info" @click="rootPathClick">inside路径</n-button>
            </n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="1">
            <n-gi>快捷键:</n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="1">
            <n-gi>
              <!-- <HotkeyInput v-model="shortcutStr"></HotkeyInput> -->
              <HotkeyInput :multiple="true" :max="4" v-model="shortcutStr"></HotkeyInput>
            </n-gi>
          </n-grid>
        </div>
      </n-message-provider>
    </n-notification-provider>
  </div>
</template>