<template>
  <n-config-provider :theme="darkTheme" :locale="i18nt">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <k-alive :include="keepAliveData.include" :exclude="keepAliveData.exclude" :max="keepAliveData.max"
          :key="route.meta['usePathKey'] ? route.path : undefined">
          <component :is="Component" />
        </k-alive>
      </transition>
    </router-view>
  </n-config-provider>
</template>
<script setup lang="ts">
import { keepAliveData } from '@/renderer/vue/store/keepAlive';
import { NConfigProvider, darkTheme } from "naive-ui";
import { i18n } from "@/renderer/vue/i18n";
import { computed, defineComponent, h, resolveComponent, } from 'vue';
const i18nt = computed(() => (i18n.global.messages as AnyObject)[i18n.global.locale].el);
const routerView = defineComponent({
  render: () => h(resolveComponent('router-view'))
})
const component = defineComponent({
  render: () => h(resolveComponent('component'))
})
const kAlive = defineComponent({
  render: () => h(resolveComponent('keep-alive'))
})
</script>
<style lang="scss">
body {
  background: var(--dark);
  color: var(--white);
}
</style>