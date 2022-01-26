<template>
  <div class="container">
    <Head />
    <div class="about-info">
      <n-image
        src="https://avatars.githubusercontent.com/u/93173537?v=4"
        width="128"
        height="128"
        alt="@沒禮貌的芬蘭人"
      ></n-image>
      <div @click="openLicense" class="name">MIT License</div>
      <n-modal v-model:show="licenseShow">
        <n-card style="width: 600px;" :bordered="true" size="huge" role="dialog" aria-modal="true">
          <div>{{ license }}</div>
        </n-card>
      </n-modal>
      <div @click="open" class="name">没礼貌的芬兰人</div>
      <n-button @click="toHome">首页</n-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { windowShow } from '@/renderer/common/window';
import { getExternPath, openUrl } from '@/renderer/common/app';
import { NImage, NButton, NModal,NCard } from 'naive-ui'
import Router from '@/renderer/router';
import { readFile } from '@/renderer/common/general/file';

let licenseShow = ref(false);
let license = ref('');

onMounted(() => {
  windowShow();
});


function open() {
  openUrl('https://github.com/mlmdflr');
}
async function openLicense() {
  readFile(await getExternPath('LICENSE'), { encoding: 'utf8' }).then((str) => {
    license.value = str
    licenseShow.value = true;
  })
}

function toHome() {
  Router.push('/home')
}
</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
