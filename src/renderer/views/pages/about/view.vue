<template>
    <div class="container">

        <Head v-on:close-before="bClose" />
    </div>
</template>


<script setup lang="ts" >
import { onMounted } from 'vue';
import { viewBind, viewSetBounds, viewUnBind } from '@mlmdflr/electron-modules/renderer/view';
import { windowShow, windowViewIdAll } from "@mlmdflr/electron-modules/renderer/window";
import { defaultBounds } from "@/cfg/view.cfg";
import { Customize_Route } from '@mlmdflr/electron-modules/types/main';
import Head from '@/renderer/views/components/head/index.vue';

const customize = window.customize as Customize_Route
let bClose = () => {
    windowViewIdAll().then(vids => {
        viewUnBind(customize.id, vids[0]).then(() => {
            viewBind(customize.parentId as number | bigint, vids[0]).then(() => {
                viewSetBounds(vids[0], defaultBounds)
            })
        })
    })
}


onMounted(() => {
    windowShow();
});

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>
