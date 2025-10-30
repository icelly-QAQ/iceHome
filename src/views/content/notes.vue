<style scoped>
.card {
  height: 250px;
  width: 100%;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
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
  height: calc(100vh - 20px);
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

/* 随笔列表容器样式 - 隐藏滚动条 */
.article-list-container {
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.article-list-container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
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
    v-if="loadStatus == 1"
    justify="center"
    align="center"
    style="height: 100vh"
  >
    <n-spin size="large" />
  </n-flex>

  <n-flex
    v-if="loadStatus == 3"
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

  <div v-if="loadStatus == 2">
    <!-- 滚动容器 -->
    <div 
      class="article-list-container" 
      @scroll="handleScroll"
      ref="scrollContainer"
    >
      <n-back-top :right="100" />
      
      <!-- 文章网格布局 -->
      <div class="article-grid">
        <div 
          v-for="note in notes" 
          :key="note.id"
          class="article-item"
        >
          <n-card class="card" style="padding: 5px;">
            <div class="card-content">
              <div class="card-meta">
                <n-flex align="center">
                  {{ formatDate(note.created_at) }}
                </n-flex>
              </div>
              <div>
                {{ note.content }}
              </div>
            </div>
          </n-card>
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="isLoading && currentPage > 1" class="loading-container">
        <n-spin size="small" />
        <span style="margin-left: 8px;">加载中...</span>
      </div>
      
      <!-- 没有更多数据 -->
      <div v-else-if="doneLoading" class="no-more-container">
        <div>没有更多随笔了</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import axios from "axios";

// 定义随笔类型
interface Note {
  id: number;
  content: string;
  views: number;
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

const loadStatus = ref(1); // loading: 1, success: 2, error: 3
const notes = ref<Note[]>([]);
const currentPage = ref(1);
const pagination = ref<Pagination>({
  page: 1,
  per_page: 8, // 每页数量
  total: 0,
  pages: 0,
  has_next: false,
  has_prev: false
});
const doneLoading = ref(false); // 标记是否已加载全部数据
const isLoading = ref(false);
const scrollContainer = ref<HTMLElement>();

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 获取随笔数据
const fetchNotes = async (page: number = 1) => {
  try {
    const response = await axios.get(`https://back.icelly.xyz/api/v1/notes?page=${page}&per_page=${pagination.value.per_page}`);
    
    if (response.data && response.data.notes) {
      if (page === 1) {
        notes.value = response.data.notes;
      } else {
        notes.value.push(...response.data.notes);
      }
      
      pagination.value = response.data.pagination || {
        page: 1,
        per_page: pagination.value.per_page,
        total: 0,
        pages: 0,
        has_next: false,
        has_prev: false
      };
      
      return { success: true, data: response.data.notes };
    }
    return { success: false, error: 'Invalid response structure' };
  } catch (error) {
    console.error("获取随笔失败:", error);
    return { success: false, error: error };
  }
};

// 滚动事件处理 - 防抖处理
let scrollTimeout: number | null = null;
const handleScroll = (event: Event) => {
  // 清除之前的定时器
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  // 设置新的定时器，延迟执行
  scrollTimeout = window.setTimeout(() => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    
    // 当滚动到距离底部100px时触发加载
    if (scrollHeight - scrollTop - clientHeight < 100) {
      loadMoreNotes();
    }
  }, 100);
};

// 加载更多随笔
const loadMoreNotes = async () => {
  // 避免重复加载
  if (isLoading.value || doneLoading.value) return;
  
  console.log(`请求第 ${currentPage.value + 1} 页数据`);
  isLoading.value = true;
  
  try {
    const nextPage = currentPage.value + 1;
    const result = await fetchNotes(nextPage);
    
    if (result.success) {
      currentPage.value = nextPage;
      
      // 基于has_next判断是否还有更多数据
      if (!pagination.value.has_next) {
        console.log('没有更多数据了');
        doneLoading.value = true;
      }
    }
  } catch (error) {
    console.error("加载更多随笔失败:", error);
    // 失败时不标记doneLoading，允许用户重试
  } finally {
    isLoading.value = false;
  }
};

// 监听随笔变化，更新容器高度
const updateContainerHeight = () => {
  // 此函数用于在数据加载后确保滚动容器正确计算高度
};

// 使用 onMounted 生命周期钩子
onMounted(async () => {
  try {
    console.log("开始获取随笔数据...");
    console.log(`初始状态 - doneLoading: ${doneLoading.value}, has_next: ${pagination.value.has_next}`);
    isLoading.value = true;
    const result = await fetchNotes(1);
    
    if (result.success) {
      loadStatus.value = 2;
      // 确保初始化时正确设置doneLoading状态
      if (!pagination.value.has_next) {
        doneLoading.value = true;
      }
    } else {
      loadStatus.value = 3;
    }
    
    // 在下一个渲染周期后更新容器高度
    nextTick(() => {
      updateContainerHeight();
    });
  } catch (error) {
    console.error("初始化随笔加载失败:", error);
    loadStatus.value = 3;
    notes.value = [];
  } finally {
    isLoading.value = false;
  }
});

// 组件卸载时清理定时器
onUnmounted(() => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
});
</script>