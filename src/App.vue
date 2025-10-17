<style scoped>
.app-root {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
</style>



<template>
  <div class="app-root">
    <n-loading-bar-provider>
      <AppContent />
    </n-loading-bar-provider>
  </div>
</template>



<script setup lang="ts">
import Frame from "@/views/Frame.vue";
import { NLoadingBarProvider, useLoadingBar } from 'naive-ui';
import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';
import router from '@/router/router';

// 创建内部组件来使用loadingBar
const AppContent = defineComponent({
  setup() {
    // 在provider内部使用loadingBar
    const loadingBar = useLoadingBar();

    // 监听路由变化来控制加载条
    router.beforeEach((_to, _from, next) => {
      // 开始显示加载条
      loadingBar.start();
      next();
    });

    router.afterEach(() => {
      // 结束加载条
      loadingBar.finish();
    });

    return () => h(Frame, null, { default: () => h(RouterView) });
  }
});
</script>
