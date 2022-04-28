<template>
  <div class="container">

    <Head :minShow="false" :maxShow="false"></Head>
    <div class="message-info">
      <div class="text">
        <div>{{ $t('text.createParam') }}: {{ data.text }}</div>
        <div>{{ $t('text.appStartParam') }}: {{ argv }}</div>
      </div>
      <div class="btn">
        <n-space v-if="isShow">
          <n-button @click="test">{{ $t('btn.testIpc') }}</n-button>
          <n-button @click="test1">{{ $t('btn.testGet') }}</n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts" >
import type { IpcRendererEvent } from 'electron';
import { onMounted, onUnmounted, ref } from 'vue';
import {
  windowClose,
  windowSetSize,
  windowShow,
  windowIdRoute,
  windowMessageSend,
  windowMessageOn,
  windowMessageRemove,
  windowBlurFocusOn,
} from 'mm-electron/renderer';
import { NButton, NSpace } from 'naive-ui'
import { Snowflake } from 'mm-electron/utils';
import { Customize_Route } from 'mm-electron/types';
import Head from "@/renderer/vue/views/components/head/index.vue";
window.customize = window.customize as Customize_Route

windowSetSize([400, 180], false, window.customize.currentMaximized);

let isShow = ref(true)
isShow.value = !window.customize.isPackaged
window.customize.isPackaged && windowSetSize([400, 100], false, window.customize.currentMaximized);

const argv = window.customize.argv ?? ''
const data = window.customize.data ?? ''


function test() {
  //测试发送窗口发送消息+给自身反馈
  windowMessageSend(
    {
      value: new Snowflake(1n, 2n).nextId()
    },
    [],
    'communication',
    true
  )
}
/**
  * 监听自身反馈
  */
windowMessageOn((event: IpcRendererEvent, args: any) => {
  console.log(args);
}, 'communication');

onMounted(() => {
  windowShow();
});

onUnmounted(() => {
  windowMessageRemove('communication'); //关闭监听
});

//焦点获取监听
windowBlurFocusOn((_, a) => {
  console.log(a);
})

async function test1() {
  console.log(await windowIdRoute());
}

function close() {
  windowClose();
}
</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
