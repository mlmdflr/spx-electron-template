<script setup lang="ts">
import type { IpcRendererEvent } from 'electron';
import { onMounted, onUnmounted, Ref, ref, unref, computed, watch, defineComponent } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  windowCreate,
  windowShow,
  windowMessageOn,
  windowMessageRemove,
  windowBlurFocusOn
} from '@/renderer/common/window';

import { menuShow, menuOn, menuListenersRemove } from '@/renderer/common/additional/menu';

import { NNotificationProvider, NMessageProvider, useMessage, useNotification, NSelect, NButton, NGrid, NGi, NSpace, NSwitch, NotificationApi, MessageApi } from 'naive-ui'

import { Snowflake } from '@/util/snowflake';

import { getRootPath, getInsidePath, getExternPath, getPlatformPath, relaunch, launch, getAppInfo } from '@/renderer/common/app';

import HotkeyInput from '@/renderer/views/components/hotkeyInput-vue3/index.setup.vue';

import {
  shortcutOn,
  shortcut,
  unShortcutAll,
  unShortcut,
  shortcutGetByKey
} from '@/renderer/common/enhance/shortcut';
import Router from '@/renderer/router';

import { i18nt, setLanguage, i18nLocale } from "@/renderer/i18n";

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
  render: () => { }
})



let auto = ref(false);

let shortcutStr = ref();
let shortcutId = ref();

let langOp = computed(() => {
  return [
    {
      label: i18nt('select.chinese'),
      value: 'zh-cn',
    }, {
      label: i18nt('select.english'),
      value: 'en',
    },
  ]
})

let lang = ref(i18nLocale())


function SwitchLang(value: string) {
  lang.value = value
  setLanguage(value);
}

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
    title: i18nt('text.testRightkey'),
    route: '/message',
    parentId: window.customize.id,
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
      title: i18nt('text.testPpw'),
      route: '/message',
      data: { text: 'wdnmd' },
      parentId: window.customize.id
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
    url: 'https://mlmdflr.cc'
  }, {
    width: 800,
    height: 600
  });
}

const snowflakeClick = () => {
  notification.success({
    title: i18nt('btn.generate'),
    content: new Snowflake(1n, 2n).nextId().toString(),
    duration: 3000
  })
}
const launchSwitch = (value: boolean) => {
  nmessage.success(i18nt('msg.switchMsg') + (launch(value) ? i18nt('switch.on') : i18nt('switch.off')))
}

const platformPathClick = async () => {
  notification.success({
    title: 'platform' + i18nt('btn.path'),
    content: await getPlatformPath(),
    duration: 3000
  })
}
const externPathClick = async () => {
  notification.success({
    title: 'extern' + i18nt('btn.path'),
    content: await getExternPath(),
    duration: 3000
  })
}
const insidePathClick = async () => {
  notification.success({
    title: 'inside' + i18nt('btn.path'),
    content: await getInsidePath(),
    duration: 3000
  })
}
const rootPathClick = async () => {
  notification.success({
    title: 'root' + i18nt('btn.path'),
    content: await getRootPath(),
    duration: 3000
  })
}

async function rebootApp() {
  if ((await getAppInfo()).isPackaged) {
    relaunch(true);
  } else {
    nmessage.warning(i18nt('msg.restartDev'))
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
    nmessage.success(`${i18nt('msg.hotkeyMsg')}${key}`);
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
          nmessage.success(`${i18nt('msg.hotkeyMsg')}${key}`);
        });
      }
    } else {
      if (shortcutStr.value?.size !== 0) {
        shortcutId.value = await shortcut(Array.from(shortcutStr.value));
        shortcutOn(shortcutId.value, (_e, key) => {
          nmessage.success(`${i18nt('msg.hotkeyMsg')}${key}`);
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
            <n-button strong secondary type="info" @click="toAbout">{{ $t('btn.about') }}</n-button>
            <n-button strong secondary type="info" @click="toRepositories">{{ $t('name') }}</n-button>
            <n-button strong secondary type="info" @click="test">{{ $t('btn.ppw') }}</n-button>
            <n-button strong secondary type="info" @click="snowflakeClick">{{ $t('btn.generate') }}</n-button>
            <n-button strong secondary type="warning" @click="rebootApp">{{ $t('btn.relaunch') }}</n-button>
          </n-space>
          <n-grid x-gap="12" :cols="1">
            <n-gi>{{ $t('text.start') }}:</n-gi>
            <n-gi>
              <n-switch v-model="auto" @update-value="launchSwitch">
                <template #checked>{{ $t('switch.on') }}</template>
                <template #unchecked>{{ $t('switch.off') }}</template>
              </n-switch>
            </n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="1">
            <n-gi>{{ $t('text.packPath') }}:</n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="4">
            <n-gi>
              <n-button tertiary type="info" @click="platformPathClick">platform{{ $t('btn.path') }}</n-button>
            </n-gi>
            <n-gi>
              <n-button tertiary type="info" @click="externPathClick">extern{{ $t('btn.path') }}</n-button>
            </n-gi>
            <n-gi>
              <n-button tertiary type="info" @click="insidePathClick">inside{{ $t('btn.path') }}</n-button>
            </n-gi>
            <n-gi>
              <n-button tertiary type="info" @click="rootPathClick">root{{ $t('btn.path') }}</n-button>
            </n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="2">
            <n-gi>{{ $t('text.hotkey') }}:</n-gi>
            <n-gi>{{ $t('text.language') }}:</n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="2">
            <n-gi>
              <hotkey-input :multiple="true" :max="4" v-model="shortcutStr"></hotkey-input>
            </n-gi>
            <n-gi>
              <n-select :value="lang" @update-value="SwitchLang" :options="langOp" />
            </n-gi>
          </n-grid>
        </div>
      </n-message-provider>
    </n-notification-provider>
  </div>
</template>