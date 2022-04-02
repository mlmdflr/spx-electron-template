<template>
  <div class="container">
    <Head :minShow="false" :maxShow="false" />
    <div class="message-info">
      <div class="text">
        <div>{{$t('text.createParam')}}: {{ data.text }}</div>
        <div>{{$t('text.appStartParam')}}: {{ argv }}</div>
      </div>
      <n-space>
        <n-button @click="test">{{$t('btn.testIpc')}}</n-button>
        <n-button @click="test1">{{$t('btn.testGet')}}</n-button>
      </n-space>
    </div>
  </div>
</template>


<script setup lang="ts" >
import type { IpcRendererEvent } from 'electron';
import { onMounted, onUnmounted } from 'vue';
import {
  windowClose,
  windowSetSize,
  windowShow,
  windowIdRoute,
  windowMessageSend,
  windowMessageOn,
  windowMessageRemove,
  windowBlurFocusOn
} from '@/renderer/common/window';
import { NButton, NSpace } from 'naive-ui'
import { Snowflake } from '@/util/snowflake';
import { i18nLocale } from "@/renderer/i18n";

console.log();


i18nLocale() === 'en' && windowSetSize([400, 170], false, window.customize.currentMaximized);
i18nLocale() !== 'en' && windowSetSize([400, 150], false, window.customize.currentMaximized);

const argv = window.customize.argv ?? ''
const data = window.customize.data ?? ''

function test() {
  //测试发送窗口发送消息+给自身反馈
  windowMessageSend(
    'communication',
    {
      value: new Snowflake(1n, 2n).nextId()
    },
    true
  );
}
/**
  * 监听自身反馈
  */
windowMessageOn('communication', (event: IpcRendererEvent, args: any) => {
  console.log(args);
});

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
