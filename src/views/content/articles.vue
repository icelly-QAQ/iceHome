<style scoped>
/* 保持原有卡片样式 */
.card {
  height: 250px;
  width: 100%;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-meta {
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
}

.err-card {
  height: 280px;
  width: 400px;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
}

.loading-container {
  text-align: center;
  color: #666;
}

.no-more-container {
  padding: 20px;
  text-align: center;
  color: #999;
}

/* 虚拟滚动容器样式 */
.virtual-scroll-container {
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: relative;
}

:deep(.virtual-scroll-container) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

:deep(.virtual-scroll-container::-webkit-scrollbar) {
  width: 0px;
  height: 0px;
}

/* 占位容器，用于计算总高度 */
.scroll-placeholder {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  visibility: hidden;
  pointer-events: none;
}

/* 可见项目容器 */
.visible-items-container {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

/* 文章单列布局 */
.article-grid {
  display: block;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.loading-grid {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.loading-slot {
  height: 300px; /* 与 itemHeight 保持一致 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.article-item {
  width: 100%;
  margin-bottom: 16px;
}

.load-card {
  height: 70px;
  max-width: 150px;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <n-flex
    v-if="loadStstus == 1"
    justify="center"
    align="center"
    style="height: 100vh"
  >
    <n-spin size="large" />
  </n-flex>

  <n-flex
    v-if="loadStstus == 3"
    justify="center"
    align="center"
    style="height: 100vh"
  >
    <n-card class="err-card" style="width: 600px">
      <n-result status="500" title="500 服务器错误" description="后端坠机啦！">
        <template #footer>
          <n-button>通知冰冰</n-button>
        </template>
      </n-result>
    </n-card>
  </n-flex>

  <div v-if="loadStstus == 2">
      <!-- 虚拟滚动容器 -->
      <div 
        class="virtual-scroll-container" 
        @scroll="handleScroll"
        ref="scrollContainer"
      >
        <n-back-top :right="100" />
        <!-- 占位元素，用于计算总滚动高度 -->
        <div 
          class="scroll-placeholder" 
          :style="{ height: totalHeight + 'px' }"
        ></div>
        
        <!-- 实际渲染可见项目的容器 -->
        <div 
          class="visible-items-container" 
          :style="{ transform: `translateY(${calculatedOffsetY}px)`, position: 'absolute' }"
        >
          <!-- 文章网格布局 -->
          <div class="article-grid">
            <div 
              v-for="article in visibleArticles" 
              :key="article.id"
              class="article-item"
            >

              <n-card class="card" style="padding: 7px;">
                <div class="card-content">
                  <h3 class="card-title">{{ article.title }}</h3>
                  <div class="card-meta">
                    <n-flex align="center">
                      {{ formatDate(article.created_at) }}
                      <n-icon><EyeOutline /></n-icon>
                      <div style="margin-left: -10px;">{{ article.views }}</div>
                      <n-icon><BookmarkOutline /></n-icon>
                      <div style="margin-left: -10px;">{{ article.category }}</div>
                    </n-flex>
                  </div>
                  <div style="white-space: pre-wrap; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; line-clamp: 3; display: box; box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                    <n-ellipsis :line-clamp="5" tooltip="false">
                      {{ removeHtmlTags(article.content) }}
                    </n-ellipsis>
                  </div>
                </div>
              </n-card>
            </div>
          </div>
          
          <!-- 加载状态 -->
          <div v-if="isLoading && currentPage > 1" class="loading-container">
            <div class="loading-grid">
              <div class="loading-slot">
                <n-card class="load-card">
                  <n-flex justify="center" align="center">
                    <n-spin size="small" />
                    <div style="margin-left:8px">加载中...</div>
                  </n-flex>
                </n-card>
              </div>
            </div>
          </div>
          
          <!-- 没有更多数据 -->
          <div v-else-if="doneLoading" class="no-more-container">
            <div>没有更多文章了</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { ref, onMounted, nextTick, computed, watch } from "vue";
import axios from "axios";

import {
  EyeOutline,
  BookmarkOutline,
} from "@vicons/ionicons5";

// 定义文章类型
interface Article {
  id: number;
  title: string;
  content: string;
  views: number;
  category: string;
  created_at: string;
}

// 分页信息类型
interface Pagination {
  page: number;
  per_page: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

const loadStstus = ref(1); // loading: 1, success: 2, error: 3
const articles = ref<Article[]>([]);
const currentPage = ref(1);
const pagination = ref<Pagination>({
  page: 1,
  per_page: 8, // 恢复到适中的每页数量
  total: 0,
  pages: 0,
  has_next: false,
  has_prev: false
});
const doneLoading = ref(false);
const isLoading = ref(false);

// 虚拟滚动相关状态
const scrollContainer = ref<HTMLElement>();
const bufferSize = 5; // 单列布局时适当增加缓冲区
const itemsPerRow = ref(1); // 每行显示1个卡片
const itemHeight = 300; // 每个卡片(包括间距)的预估高度
const containerHeight = ref(0);
const scrollTop = ref(0);

// 固定单列布局，不需要响应式调整

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 移除HTML标签，但保留并解析换行标签
const removeHtmlTags = (html: string): string => {
  if (!html) return '';
  
  // 首先将<br>和<br/>转换为换行符
  let text = html.replace(/<br\s*\/?>/gi, '\n');
  
  // 将<p>标签和其结束标签</p>转换为换行符（两个换行符表示段落）
  text = text.replace(/<\/?p\s*[^>]*>/gi, '\n\n');
  
  // 移除其他HTML标签
  text = text.replace(/<[^>]+>/g, '');
  
  // 清理多余的空白字符（保留换行符）
  text = text.replace(/[ \t]+/g, ' ');
  
  // 移除连续的换行符，保留最多两个换行符（表示段落分隔）
  text = text.replace(/\n{2,}/g, '\n');
  
  // 移除首尾空白字符
  return text.trim();
};

// 获取文章数据
const fetchArticles = async (page: number = 1) => {
  try {
    // 传递per_page参数，控制每页加载数量
    const response = await axios.get(`http://localhost:5000/api/v1/articles?page=${page}&per_page=${pagination.value.per_page}`);
    
    if (response.data && response.data.articles) {
      if (page === 1) {
        articles.value = response.data.articles;
      } else {
        // 优化：避免不必要的数组展开操作
        articles.value.push(...response.data.articles);
      }
      
      pagination.value = response.data.pagination || {
        page: 1,
        per_page: pagination.value.per_page,
        total: 0,
        pages: 0,
        has_next: false,
        has_prev: false
      };
      
      return { success: true, data: response.data.articles };
    }
    return { success: false, error: 'Invalid response structure' };
  } catch (error) {
    console.error("获取文章失败:", error);
    return { success: false, error: error };
  }
};

// 计算总高度 - 考虑网格布局
const totalHeight = computed(() => {
  const rows = Math.ceil(articles.value.length / itemsPerRow.value);
  return rows * itemHeight;
});

// 计算可见的文章索引范围 - 考虑网格布局
const visibleRange = computed(() => {
  // 根据滚动位置计算可见的起始行和结束行
  const startRow = Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferSize);
  const endRow = Math.min(
    Math.ceil(articles.value.length / itemsPerRow.value),
    Math.ceil((scrollTop.value + containerHeight.value) / itemHeight) + bufferSize
  );
  
  // 转换为文章索引
  const start = startRow * itemsPerRow.value;
  const end = Math.min(articles.value.length, endRow * itemsPerRow.value);
  
  return { start, end };
});

// 计算应该显示的文章列表
const visibleArticles = computed(() => {
  const { start, end } = visibleRange.value;
  return articles.value.slice(start, end);
});

// 计算垂直偏移 - 基于行
const calculatedOffsetY = computed(() => {
  const startRow = Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferSize);
  return startRow * itemHeight;
});

// 处理滚动事件
let scrollTimeout: number | null = null;
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  scrollTop.value = target.scrollTop;
  containerHeight.value = target.clientHeight;
  
  
  
  // 检查是否需要加载更多
  if (!isLoading.value && !doneLoading.value) {
    // 当滚动到底部附近时触发加载
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 500) {
      // 防抖处理
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = window.setTimeout(async () => {
        await loadMoreArticles();
      }, 300);
    }
  }
};

// 加载更多文章
const loadMoreArticles = async () => {
  if (isLoading.value || doneLoading.value) return;
  
  isLoading.value = true;
  
  try {
    if (pagination.value.has_next) {
      const nextPage = currentPage.value + 1;
      const result = await fetchArticles(nextPage);
      
      if (result.success) {
        currentPage.value = nextPage;
        
        // 检查是否还有更多数据
        if (!pagination.value.has_next) {
          doneLoading.value = true;
        }
      }
    } else {
      doneLoading.value = true;
    }
  } catch (error) {
    console.error("加载更多文章失败:", error);
  } finally {
    // 延迟设置为false，避免快速连续触发
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
};

// 监听文章变化，更新虚拟滚动状态
watch(() => articles.value.length, () => {
  nextTick(() => {
    if (scrollContainer.value) {
      // 重新计算布局
      handleScroll({ target: scrollContainer.value } as unknown as Event);
    }
  });
});

// 使用 onMounted 生命周期钩子
onMounted(async () => {
  try {
    console.log("开始获取文章数据...");
    isLoading.value = true;
    const result = await fetchArticles(1);
    
    if (result.success) {
      loadStstus.value = 2;
    } else {
      loadStstus.value = 3;
    }
    
    console.log("获取到的文章数据:", articles.value);
  } catch (error) {
    console.error("初始化文章加载失败:", error);
    loadStstus.value = 3;
    articles.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>
