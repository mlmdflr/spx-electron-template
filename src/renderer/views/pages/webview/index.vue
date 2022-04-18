<template>
    <div class="container">

        <Head v-on:close-before="bClose" />
    </div>
</template>


<script setup lang="ts" >
import { onMounted } from 'vue';
import {
    windowShow, windowViewIdAll,
} from '@/renderer/common/window';
import { viewDestroy } from '@/renderer/common/view';
let bClose = () => {
    windowViewIdAll().then(vids => {
        vids.length === 1 && viewDestroy(vids[0])
    })
}



onMounted(() => {
    windowShow();
});

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
