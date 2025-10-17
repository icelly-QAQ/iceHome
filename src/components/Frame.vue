<style scoped>
.frame-root {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}

.frame-root :deep(.n-layout) {
  height: 91.3vh;
  flex: 1 1 auto;
  min-height: 0; /* allow children to control scrolling */
  display: flex;
  flex-direction: column;
  background-image: url(/src/assets/static/backgrounds/1.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.frame-root :deep(.n-layout-content) {
  overflow: auto;
  flex: 1 1 auto;
  min-height: 0;
}

.frame-root :deep(.n-layout-header) {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  position: relative;
  z-index: 2;
}

#Sidebar {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  position: relative;
  z-index: 3;
}
</style>



<template>
  <n-flex vertical size="large">
    <div class="frame-root">
      <n-layout style="flex: 1; min-height: 0">
        <n-layout-header>
          <n-flex align="center">
            <n-avatar
              color="255, 255, 255, 0.9"
              :size="50"
              src="src/assets/static/frameStatic/Y-LIEF.png"
              style="margin-left: 15px"
            />
            <n-h2> icelly_QAQ </n-h2>
          </n-flex>
        </n-layout-header>
        <n-layout has-sider style="flex: 1; min-height: 0">
          <n-layout-sider
            id="Sidebar"
            bordered
            collapse-mode="transform"
            :collapsed-width="0"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
          >
            <n-flex justify="center">
              <n-avatar
                round
                :size="64"
                src="src/assets/static/frameStatic/avatar.jpg"
              />
            </n-flex>
            <n-divider style="margin-top: 5px"> icelly_QAQ </n-divider>

            <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :render-label="renderMenuLabel"
              :render-icon="renderMenuIcon"
              :expand-icon="expandIcon"
            />
          </n-layout-sider>

          <!-- 内容插槽 -->
          <n-layout-content content-style="padding: 5px;">
            <n-scrollbar>
              <slot />
            </n-scrollbar>
          </n-layout-content>

        </n-layout>
      </n-layout>
    </div>
  </n-flex>
</template>



<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    href: "/",
  },
  {
    label: "关于",
    key: "about",
    children: [
      {
        label: "我自己",
        key: "myself",
        href: "/about/myself",
      },
      {
        label: "朋友们",
        key: "friends",
        href: "/about/friends",
      },
    ],
  },
];

const collapsed = ref(true);

function renderMenuLabel(option: MenuOption) {
  // 如果 menu option 中包含 href，并且以 http 开头，保留外部链接行为
  if ("href" in option && typeof option.href === "string") {
    const href = option.href as string;
    if (/^https?:\/\//.test(href)) {
      return h(
        "a",
        { href, target: "_blank", rel: "noopener" },
        option.label as string
      );
    }
    // 否则视为内部路由路径，使用 RouterLink 来进行 SPA 导航
    return h(
      RouterLink,
      { to: href },
      { default: () => option.label as string }
    );
  }
  return option.label as string;
}

function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
}

function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}
</script>
