<template>
  <div class="container">
    <Head :eventShow="false" />
    <div class="message-info">
      <div class="text">
        <div>创建传参: {{ data.text }}</div>
        <div>app启动参数: {{ argv }}</div>
      </div>
      <n-space>
        <n-button @click="test">测试通讯</n-button>
        <n-button @click="test1">测试获取路由id</n-button>
      </n-space>
        <n-button class="close" @click="close">确定</n-button>
    </div>
  </div>
</template>


<script setup lang="ts" >
import type { IpcRendererEvent } from 'electron';
import { onMounted, onUnmounted } from 'vue';
import customize from '@/renderer/store/customize';
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
import { snowflake } from '@/util/snowflake';

windowSetSize([400, 200], false, customize.get().currentMaximized);
const argv = customize.get().argv ?? ''
const data = customize.get().data ?? ''

function test() {
  //测试发送窗口发送消息+给自身反馈
  windowMessageSend(
    'communication',
    {
      value: new snowflake(1n, 2n).nextId()
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
