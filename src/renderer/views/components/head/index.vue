<template>
  <div class="head-info drag">
    <div v-if="isMacintosh" class="content">
      <div></div>
      <div class="title">{{ title }}</div>
    </div>
    <div v-else class="content">
      <div class="title">{{ title }}</div>
      <div v-if="minShow || maxShow || closeShow" class="events">
        <div v-if="minShow" @click="min" class="event min no-drag"></div>
        <div v-if="maxShow" @click="maxMin" class="event max-min no-drag"></div>
        <div v-if="closeShow" @click="close" class="event close no-drag"></div>
      </div>
    </div>
  </div>
</template>



<script setup lang='ts' >
import { windowClose, windowMaxMin, windowMin } from '@/renderer/common/window';

const emit = defineEmits(['close-before'])

const props = defineProps({
  minShow: {
    type: Boolean,
    default: true
  },
  maxShow: {
    type: Boolean,
    default: true
  },
  closeShow: {
    type: Boolean,
    default: true
  }
});

const isMacintosh = window.environment.platform === 'darwin';


let title = window.customize.title

function min() {
  windowMin();
}

function maxMin() {
  windowMaxMin();
}

function close() {
  emit('close-before')
  windowClose();
}

</script>

<style lang='scss' scoped>
@import "./scss/index";
</style>