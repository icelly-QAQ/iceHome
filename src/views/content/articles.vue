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
  padding: 40px 0;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-more-container {
  padding: 40px 0;
  text-align: center;
  color: #999;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 确保加载卡片有足够的高度 */
.load-card {
  height: 100px;
  min-width: 200px;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 虚拟滚动容器样式 */
.virtual-scroll-container {
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: relative;
}

/* 文章列表容器样式 - 隐藏滚动条 */
.article-list-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.article-list-container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
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
    v-if="loadStatus === 1"
    justify="center"
    align="center"
    style="height: 100vh"
  >
    <n-spin size="large" />
  </n-flex>

  <n-flex
    v-if="loadStatus === 3"
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

  <div v-if="loadStatus === 2">
      <!-- 简单的文章列表渲染 -->
      <div 
        class="article-list-container" 
        @scroll="handleScroll"
        ref="scrollContainer"
        style="overflow-y: auto; height: calc(100vh - 60px);"
      >
        <n-back-top :right="100" />
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
                    <n-icon type="eye-outline" style="margin-left: 5px;" />
                    <div style="margin-left: 5px;">{{ article.views }}</div>
                    <n-icon type="bookmark-outline" style="margin-left: 5px;" />
                    <div style="margin-left: 5px;">{{ article.category }}</div>
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
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { ref, onMounted, nextTick, computed, watch, onUnmounted } from "vue";
import axios from "axios";



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

// 状态管理
const loadStatus = ref(1); // loading: 1, success: 2, error: 3
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
const doneLoading = ref(false); // 确保初始值为false，允许加载更多
const isLoading = ref(false);
console.log('组件初始化 - doneLoading:', doneLoading.value, 'has_next:', pagination.value.has_next);

// 滚动容器引用
const scrollContainer = ref<HTMLElement>();

// 简单的滚动状态管理
const scrollPosition = ref(0);

// 组件卸载时清理定时器
onUnmounted(() => {
  if (scrollTimeout !== null) {
    window.clearTimeout(scrollTimeout);
  }
});

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
  
  try {
    // 首先将<br>和<br/>转换为换行符
    let text = html.replace(/<br\s*\/?>/gi, '\n');
    
    // 将<p>标签和其结束标签</p>转换为换行符（两个换行符表示段落）
    text = text.replace(/<\/?p\s*[^>]*>/gi, '\n\n');
    
    // 移除其他HTML标签
    text = text.replace(/<[^>]+>/g, '');
    
    // 清理多余的空白字符（保留换行符）
    text = text.replace(/[ \t]+/g, ' ');
    
    // 移除连续的换行符，保留最多两个换行符（表示段落分隔）
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // 移除首尾空白字符
    return text.trim();
  } catch (error) {
    console.error('HTML标签处理出错:', error);
    return html.slice(0, 200); // 返回部分原文作为降级方案
  }
};

// 获取文章数据
const fetchArticles = async (page: number = 1) => {
  try {
    // 传递per_page参数，控制每页加载数量
    const response = await axios.get(`https://back.icelly.xyz/api/v1/articles?page=${page}&per_page=${pagination.value.per_page}`);
    
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

// 简单的滚动加载实现，无需复杂的虚拟滚动计算
const visibleArticles = computed(() => {
  return articles.value;
});

// 容器高度相关状态
const containerHeight = ref(0);


// 滚动事件处理
let scrollTimeout: number | null = null;
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target) return;
  
  // 保存当前滚动位置
  scrollPosition.value = target.scrollTop;
  
  // 防抖处理
  if (scrollTimeout !== null) {
    clearTimeout(scrollTimeout);
  }
  
  scrollTimeout = window.setTimeout(() => {
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const currentScrollTop = target.scrollTop;
    
    // 当滚动到距离底部100px时加载更多
    const threshold = 100;
    
    if (scrollHeight - (currentScrollTop + clientHeight) < threshold && 
        !isLoading.value && 
        !doneLoading.value) {
      loadMoreArticles();
    }
  }, 100);
};

// 加载更多文章
const loadMoreArticles = async () => {
  console.log('触发加载更多...');
  
  // 防止重复加载
  if (isLoading.value || doneLoading.value) {
    return;
  }
  
  try {
    isLoading.value = true;
    
    // 请求下一页数据
    const nextPage = currentPage.value + 1;
    console.log(`请求第${nextPage}页数据`);
    const result = await fetchArticles(nextPage);
    
    if (result.success && result.data && result.data.length > 0) {
      currentPage.value = nextPage;
      
      // 关键修复：使用pagination.value.has_next来判断是否还有更多数据
      // 而不是仅仅依靠返回的数据长度
      doneLoading.value = !pagination.value.has_next;
      console.log(`加载成功，还有更多数据: ${pagination.value.has_next}`);
    } else {
      console.log('没有更多数据或加载失败');
      // 只有在确实没有数据时才标记为完成
      // 加载失败时不要立即标记为done，允许重试
      if (result.success && (!result.data || result.data.length === 0)) {
        doneLoading.value = true;
      }
    }
  } catch (error) {
    console.error('加载更多文章时发生错误:', error);
    // 添加错误重试机制
    setTimeout(() => {
      if (!isLoading.value && !doneLoading.value) {
        loadMoreArticles();
      }
    }, 1500);
  } finally {
    isLoading.value = false;
  }
};

// 监听文章变化，更新虚拟滚动状态
watch(() => articles.value.length, () => {
  nextTick(() => {
    // 移除直接触发scroll事件，避免循环更新
    if (scrollContainer.value) {
      // 仅更新必要的状态，而不是重新触发整个滚动逻辑
      containerHeight.value = scrollContainer.value.clientHeight;
    }
  });
});

// 组件卸载时清理定时器，防止内存泄漏
onUnmounted(() => {
  if (scrollTimeout !== null) {
    window.clearTimeout(scrollTimeout);
  }
});

// 使用 onMounted 生命周期钩子
onMounted(async () => {
  try {
    console.log("开始获取文章数据...");
    isLoading.value = true;
    const result = await fetchArticles(1);
    
    if (result.success) {
      loadStatus.value = 2;
      // 确保容器高度正确设置
      nextTick(() => {
        if (scrollContainer.value) {
          containerHeight.value = scrollContainer.value.clientHeight;
        }
      });
    } else {
      loadStatus.value = 3;
    }
    
    console.log("获取到的文章数据:", articles.value);
  } catch (error) {
    console.error("初始化文章加载失败:", error);
    loadStatus.value = 3;
    articles.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>
