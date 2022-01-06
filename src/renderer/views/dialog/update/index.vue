<template>
  <div class="container">
    <Head />
    <ElContainer>
      <ElHeader height="20px"></ElHeader>
      <ElMain>
        <div class="update-main">
          <ElRow :gutter="20">
            版本号:
            <span class="state">{{ version }}</span>
          </ElRow>
          <ElRow :gutter="20">
            状态:
            <span class="state">{{ updateState }}</span>
          </ElRow>
          <ElRow :gutter="20" v-if="proShow">下载速度:{{ speed }}</ElRow>
          <ElRow>
            <div class="down">
              <ElButton v-if="installShow" type="info" size="mini" @click="install">立即安装</ElButton>
            </div>
          </ElRow>
          <ElRow>
            <div class="down">
              <ElButton v-if="downShow" type="info" size="mini" @click="down">立即下载</ElButton>
            </div>
          </ElRow>
        </div>
      </ElMain>
      <ElFooter>
        <div v-if="proShow">
          <ElProgress :percentage="progress" :indeterminate="true"></ElProgress>
        </div>
      </ElFooter>
    </ElContainer>
  </div>
</template>

<script setup lang="ts" >
import { onMounted, ref } from 'vue';
import { windowShow } from '@/renderer/common/window';
import { updateOn, updateCheck, updateDownload, updateInstall } from '@/renderer/common/enhance/update';
import { getGlobal } from '@/renderer/common';
import net from '@/util/net';
import { ElButton, ElRow, ElProgress, ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus';

let version: string
getGlobal('app.version').then(version => version ?? '1.0.0')

/**
 * 进度条 展示
 */
let proShow = ref(false);
/**
 * 状态
 */
let updateState = ref('');
/**
 * 进度
 */
let progress = ref(1);
/**
 * 下载按钮
 */
let downShow = ref(false);
/**
 * 安装按钮
 */
let installShow = ref(false);

/**
 * 下载速度 byte/s
 */
let speed = ref('0 B/s');


onMounted(() => {
  updateCheck(true, false);
  updateOn(async (e, data) => {
    console.log(data);
    switch (data.code) {
      case 0:
        updateState.value = data.msg;
        proShow.value = false;
        downShow.value = false;
        break;
      case 1:
        updateState.value = data.msg;
        break;
      case 2:
        updateState.value = data.msg + ',是否立即下载';
        downShow.value = true;
        break;
      case 3:
        updateState.value = data.msg;
        proShow.value = true;
        downShow.value = false;
        let rest = net.bytesToSize(data.value.bytesPerSecond);
        speed.value = rest['bytes'] + ' ' + rest['unit'] + '/s';
        progress.value = Math.floor(data.value.percent);
        break;
      case 4:
        updateState.value = data.msg + ',是否立即安装';
        installShow.value = true;
        proShow.value = false;
        break;
      case 5:
        updateState.value = data.msg;
        break;
    }
  });
  windowShow();
});

const down = () => {
  downShow.value = false;
  updateDownload();
};
const install = () => {
  installShow.value = false;
  updateInstall(false);
};
</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>