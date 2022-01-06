<template>
  <div class="container">
    <Head/>
    <div class="message-info">
      <div class="text">
        <div>创建传参: {{ data.text }}</div>
        <div>app启动参数: {{ argv }}</div>
      </div>
      <ElButton @click="test">测试通讯</ElButton>
      <ElButton @click="test1">测试获取路由id</ElButton>
      <ElButton class="close" @click="close">确定</ElButton>
    </div>
  </div>
</template>


<script setup lang="ts" >
import type { IpcRendererEvent } from 'electron';
import {  onMounted, onUnmounted } from 'vue';
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
import { ElButton } from 'element-plus';
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
