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
import { viewBind, viewSetBounds, viewUnBind } from '@/renderer/common/view';
import { defaultBounds } from "@/cfg/view.cfg";
let bClose = () => {
    windowViewIdAll().then(vids => {
        vids.length === 1 && viewUnBind(window.customize.id as number | bigint, vids[0]).then(() => {
            viewBind((window.customize as Customize_Route).parentId as number | bigint, vids[0]).then(() => {
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
