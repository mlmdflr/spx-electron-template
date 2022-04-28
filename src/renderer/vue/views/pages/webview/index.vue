<template>
    <div class="container">

        <Head v-on:close-before="bClose" />
    </div>
</template>


<script setup lang="ts" >
import { onMounted } from 'vue';
import {
    windowShow, windowViewIdAll, viewDestroy
} from 'mm-electron/renderer';
let bClose = () => {
    windowViewIdAll().then(vid => {
        typeof vid === 'number' && viewDestroy(vid)
    })
}

onMounted(() => {
    windowShow();
});

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
