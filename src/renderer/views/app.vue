<template>
  <n-config-provider :theme="darkTheme" :locale="i18nt">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive
          :include="keepAliveData.include"
          :exclude="keepAliveData.exclude"
          :max="keepAliveData.max"
          :key="route.meta['usePathKey'] ? route.path : undefined"
        >
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </n-config-provider>
</template>
<script setup lang="ts">
import { keepAliveData } from '@/renderer/store';
import { NConfigProvider,darkTheme } from "naive-ui";
import { i18n } from "@/renderer/i18n";
import { computed } from 'vue';
const i18nt = computed(() => i18n.global.messages[i18n.global.locale].el);
</script>
<style lang="scss">
@import "./scss/color";
@import "./scss/index";
</style>
  