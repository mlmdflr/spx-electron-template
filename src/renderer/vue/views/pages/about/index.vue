<template>
  <div class="container">
    <div class="about-info">
      <n-image src="https://avatars.githubusercontent.com/u/93173537?v=4" width="128" height="128"
        :alt="'@' + i18nt('name')"></n-image>
      <div @click="openLicense" class="name">MIT License</div>
      <n-modal v-model:show="licenseShow">
        <n-card style="width: 600px;" :bordered="true" size="huge" role="dialog" aria-modal="true">
          <div>{{ license }}</div>
        </n-card>
      </n-modal>
      <div @click="open" class="name">{{ $t('name') }}</div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { getExternPath, openUrl } from '@mlmdflr/electron-modules/renderer/app';
import { readFile } from '@mlmdflr/electron-modules/renderer/file';
import { NImage, NModal, NCard } from 'naive-ui'
import { i18nt } from '@/renderer/vue/i18n'

let licenseShow = ref(false);
let license = ref('');

function open() {
  openUrl('https://github.com/mlmdflr');
}
async function openLicense() {
  readFile(await getExternPath('LICENSE'), { encoding: 'utf8' }).then((str) => {
    license.value = str
    licenseShow.value = true;
  })
}

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
