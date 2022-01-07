<template>
  <div class="container">
    <Head />
    <div class="about-info">
      <ElImage
        src="https://avatars.githubusercontent.com/u/93173537?v=4"
        style="width: 68px; height: 68px"
        alt="@沒禮貌的芬蘭人"
        :preview-src-list="['https://avatars.githubusercontent.com/u/93173537?v=4']"
      ></ElImage>
      <div @click="open" class="name">没礼貌的芬兰人</div>
      <ElButton @click="toHome">首页</ElButton>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { windowShow } from '@/renderer/common/window';
import { openUrl } from '@/renderer/common';
import { ElImage, ElButton } from 'element-plus'
import Router from '@/renderer/router';


onMounted(() => {
  windowShow();
});


function open() {
  openUrl('https://github.com/mlmdflr');
}

function toHome() {
  Router.push('/home')
}
</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
