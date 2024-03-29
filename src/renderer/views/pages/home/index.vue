<script setup lang="ts">
import type { IpcRendererEvent } from 'electron';
import { onMounted, onUnmounted, Ref, ref, computed, watch, defineComponent } from 'vue';
import {
  windowCreate,
  windowShow,
  windowMessageOn,
  windowMessageRemove,
  windowViewIdAll,
} from "@mlmdflr/electron-modules/renderer/window";
import { relaunch, launch } from "@mlmdflr/electron-modules/renderer/app";

import { viewBind, viewSetAutoResize, viewSetBounds, viewUnBind } from "@mlmdflr/electron-modules/renderer/view";

import { getRootPath, getInsidePath, getExternPath, getPlatformPath } from "@/renderer/common/resources";

import { NNotificationProvider, NMessageProvider, useMessage, useNotification, NSelect, NButton, NGrid, NGi, NSpace, NSwitch, NotificationApi, MessageApi } from 'naive-ui'

import Head from '@/renderer/views/components/head/index.vue';

import HotkeyInput from '@/renderer/views/components/hotkeyInput-vue3/index.setup.vue';

import { i18nt, setLanguage, i18nLocale } from "@/renderer/i18n";

import { Customize_Route } from '@mlmdflr/electron-modules/types/main';

const version = window.environment.systemVersion

const customize = window.customize as Customize_Route

//NotificationApi  MessageApi 初始化
type placementType = "top-left" | "top-right" | "bottom-left" | "bottom-right"
const placement: Ref<placementType> = ref('top-right')
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

windowMessageOn((_event: IpcRendererEvent, args: any) => {
  //监听弹框测试
  console.log(args);
}, 'communication');



function test() {
  windowCreate(
    {
      title: i18nt('text.testPpw'),
      route: '/message',
      data: { text: 'wdnmd' },
      parentId: customize.id,
    },
    {
      modal: true
    }
  );
}


function toAbout() {
  windowCreate({
    route: '/aboutView',
    parentId: customize.id
  }, {
    backgroundColor: '#222',
    width: 600,
    height: 400
  }).then((wid) => {
    windowViewIdAll().then((vids) => {
      viewUnBind(window.customize.id, vids[0]).then(() => {
        viewBind(wid, vids[0]).then(() => {
          viewSetBounds(vids[0], {
            x: 0,
            y: 32,
            width: 600,
            height: 368,
          })
          viewSetAutoResize(vids[0], {
            height: true,
            width: true,
            horizontal: true
          })
        })
      })
    })
  })
}

function toRepositories() {
  windowCreate({
    url: 'https://github.com/mlmdflr',
    title: '仓库',
  },
    {
      backgroundColor: '#fff'
    })
}

const defaultOpenClick = () => {
  window.ipc.invoke('defaultOpen')
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
  if (window.customize.isPackaged) {
    relaunch(true);
  } else {
    nmessage.warning(i18nt('msg.restartDev'))
  }
}




onMounted(async () => {
  windowShow();
  auto.value = launch()
});

onUnmounted(() => {
  windowMessageRemove('test'); //关闭监听
});

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>

<template>
  <div class="container">

    <Head></Head>
    <n-notification-provider :placement="placement" :max="3">
      <n-message-provider :placement="msgPlacement" :max="3">
        <n-init />
        <div class="home-info">
          <div>hello {{ version }}</div>
          <n-space>
            <n-button strong secondary type="info" @click="toAbout">{{ $t('btn.about') }}</n-button>
            <n-button strong secondary type="info" @click="toRepositories">{{ $t('btn.doc') }}</n-button>
            <n-button strong secondary type="info" @click="test">{{ $t('btn.ppw') }}</n-button>
            <n-button strong secondary type="info" @click="defaultOpenClick">{{ $t('btn.defaultOpen') }}</n-button>
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
              <n-select placement="top-start" :value="lang" @update-value="SwitchLang" :options="langOp" />
            </n-gi>
          </n-grid>
        </div>
      </n-message-provider>
    </n-notification-provider>
  </div>
</template>