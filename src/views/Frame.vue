<style scoped>
.frame-root {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}

.frame-root :deep(.n-layout) {
  height: 95.3vh;
  flex: 1 1 auto;
  min-height: 0; /* allow children to control scrolling */
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/static/backgrounds/1.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%
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
  height: 45px !important; /* 减小高度 */
  min-height: 45px !important;
  display: flex;
  align-items: center; /* 垂直居中内容 */
}

#Sidebar {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  position: relative;
}

/* 调整头像大小以适应更短的顶栏 */
.frame-root :deep(.n-layout-header .n-avatar) {
  width: 32px;
  height: 32px;
}

/* 调整标题大小 */
.frame-root :deep(.n-layout-header .n-h2) {
  font-size: 18px;
  margin: 0;
}

#menuButton {
  margin-top: 0;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.frame-root :deep(.n-layout-header .n-flex) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.frame-root :deep(.n-layout-header #menuButton svg) {
  width: 18px;
  height: 18px;
  display: block;
}
</style>

<template>
  <n-flex vertical size="large">
    <div class="frame-root">
      <n-layout style="flex: 1; min-height: 0">
        <n-layout-header>
          <n-flex align="center">
            <n-button 
              id="menuButton" 
              strong 
              secondary 
              circle
              @click="toggleSidebar"
            >
              <template #icon>
                <svg
                  t="1760691247887"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="956"
                  width="200"
                  height="200">
                  <path d="M196.277 225.916c0 12.675-10.264 22.951-22.952 22.951H87.254c-12.687 0-22.954-10.277-22.954-22.95v-86.07c0-12.675 10.267-22.952 22.954-22.952h86.071c12.688 0 22.952 10.276 22.952 22.951v86.07zM959.45 225.916c0 12.675-10.265 22.951-22.951 22.951H311.04c-12.687 0-22.953-10.276-22.953-22.95v-86.07c0-12.675 10.266-22.95 22.953-22.95h625.458c12.685 0 22.951 10.275 22.951 22.95v86.07zM196.277 532.894c0 12.675-10.264 22.952-22.952 22.952H87.254c-12.687 0-22.954-10.277-22.954-22.952v-86.07c0-12.674 10.266-22.951 22.953-22.951h86.071c12.688 0 22.952 10.276 22.952 22.952v86.069zM959.45 532.894c0 12.675-10.265 22.952-22.951 22.952H311.04c-12.687 0-22.953-10.277-22.953-22.952v-86.07c0-12.674 10.266-22.951 22.953-22.951h625.458c12.685 0 22.951 10.276 22.951 22.952v86.069zM196.277 839.871c0 12.675-10.264 22.952-22.952 22.952H87.254c-12.687 0-22.954-10.277-22.954-22.952v-86.068c0-12.676 10.266-22.953 22.953-22.953h86.071c12.688 0 22.952 10.277 22.952 22.953v86.068zM959.45 839.871c0 12.675-10.265 22.952-22.951 22.952H311.04c-12.687 0-22.953-10.277-22.953-22.952v-86.068c0-12.676 10.266-22.953 22.953-22.953h625.458c12.685 0 22.951 10.277 22.951 22.953v86.068z" p-id="957">
                  </path>
                </svg>
              </template>
            </n-button>
            <n-avatar
                color="255, 255, 255, 0.9"
                :size="32"
                :src="yLiefImage"
                style="margin-left: 5px"
              />
            <n-h2 style="font-size: 18px; margin: 0"> icelly_QAQ </n-h2>  <!-- 调整标题样式 -->
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
                style="margin-top: 15px;"
                :size="64"
                :src="avatarImage"
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

            <n-flex style="position: absolute; bottom: 10px; width: 100%;">
              <n-divider>
                Powered by icelly_QAQ
              </n-divider>
            </n-flex>
            <n-flex justify="center" style="position: absolute; bottom: 10px; width: 100%;">
              <div>
                💗使用 <a href="https://github.com/icelly-QAQ/iceHome">iceHome v0.1.0</a> 构建💗
              </div>
            </n-flex>
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
import { NIcon } from "naive-ui";
import { h, ref, type Component } from "vue";
import { RouterLink } from "vue-router";

// 导入静态图片
import yLiefImageSrc from '@/assets/static/frameStatic/Y-LIEF.png';
import avatarImageSrc from '@/assets/static/frameStatic/avatar.jpg';

import {
  HomeOutline as HomeIcon,
  PersonOutline as PersonIcon,
  PeopleOutline as PeopleIcon,
  InformationCircleOutline as AboutIcon,
  BookOutline as ContentIcon,
  TelescopeOutline as treeholeIcon,
  CaretDownOutline,
} from "@vicons/ionicons5";

// 图标渲染辅助函数
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

// 定义图片变量，使其在模板和样式中可用
const yLiefImage = yLiefImageSrc;
const avatarImage = avatarImageSrc;

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    href: "/",
    icon: renderIcon(HomeIcon)
  },
  {
    label: "关于",
    key: "about",
    icon: renderIcon(AboutIcon),
    children: [
      {
        label: "我自己",
        key: "myself",
        href: "/about/myself",
        icon: renderIcon(PersonIcon)
      },
      {
        label: "朋友们",
        key: "friends",
        href: "/about/friends",
        icon: renderIcon(PeopleIcon)
      },
    ],
  },
  {
    label: "内容",
    key: "content",
    icon: renderIcon(ContentIcon),
    children: [
      {
        label: "文章",
        key: "articles",
        href: "/content/articles",
        icon: renderIcon(ContentIcon)
      },
      {
        label: "随笔",
        key: "notes",
        href: "/content/notes",
        icon: renderIcon(ContentIcon)
      }
    ]
  },
  {
    label: "树洞",
    key: "treehole",
    href: "/treehole",
    icon: renderIcon(treeholeIcon) 
  }
];

const collapsed = ref(true);

// 切换侧边栏展开/收起状态
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

function renderMenuLabel(option: MenuOption) {
  if ("href" in option && typeof option.href === "string") {
    const href = option.href as string;
    if (/^https?:\/\//.test(href)) {
      return h(
        "a",
        { href, target: "_blank", rel: "noopener" },
        option.label as string
      );
    }
    return h(
      RouterLink,
      { to: href },
      { default: () => option.label as string }
    );
  }
  return option.label as string;
}

function renderMenuIcon(option: MenuOption) {
  // 如果选项有自定义图标，使用它
  if (option.icon && typeof option.icon === 'function') {
    return option.icon();
  }
  // 如果没有图标，返回 null 以避免占位符
  return null;
}

function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}
</script>