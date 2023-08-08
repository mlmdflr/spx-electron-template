<template>
    <div class="container">

        <Head :minShow="false" :maxShow="false"></Head>
        <div class="message-info">
            <n-result :size="size" :status="status" :title="title" :description="description" />
        </div>
    </div>
</template>
  
  
<script setup lang="ts" >
import { NResult } from 'naive-ui'
import { onMounted } from 'vue';
import {
    windowShow,
} from '@mlmdflr/electron-modules/renderer/window';
import Head from "@/renderer/views/components/head/index.vue";

const { description, size = 'medium', status, title } = window.customize.data

onMounted(() => {
    windowShow();
});
</script>
  
<style lang='scss' scoped>
@import "./scss/index";
</style>
  