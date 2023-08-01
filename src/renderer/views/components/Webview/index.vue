<template>
    <div class="container">

        <Head @close-before="closeBefore"></Head>
        <div class="message-info">
            <webview ref="webviewRef"
                :useragent="`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`">
            </webview>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Head from "@/renderer/views/components/head/index.vue";

let webviewRef = ref()

let closeBefore = () => {

}



</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>