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
              v-for="note in visibleNotes" 
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
            <div>没有更多随笔了</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from "vue";
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

const loadStstus = ref(1); // loading: 1, success: 2, error: 3
const notes = ref<Note[]>([]);
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

// 获取随笔数据
const fetchNotes = async (page: number = 1) => {
  try {
    // 传递per_page参数，控制每页加载数量
    const response = await axios.get(`http://localhost:5000/api/v1/notes?page=${page}&per_page=${pagination.value.per_page}`);
    
    if (response.data && response.data.notes) {
      if (page === 1) {
        notes.value = response.data.notes;
      } else {
        // 优化：避免不必要的数组展开操作
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

// 计算总高度 - 考虑网格布局
const totalHeight = computed(() => {
  const rows = Math.ceil(notes.value.length / itemsPerRow.value);
  return rows * itemHeight;
});

// 计算可见的随笔索引范围 - 考虑网格布局
const visibleRange = computed(() => {
  // 根据滚动位置计算可见的起始行和结束行
  const startRow = Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferSize);
  const endRow = Math.min(
    Math.ceil(notes.value.length / itemsPerRow.value),
    Math.ceil((scrollTop.value + containerHeight.value) / itemHeight) + bufferSize
  );
  
  // 转换为随笔索引
  const start = startRow * itemsPerRow.value;
  const end = Math.min(notes.value.length, endRow * itemsPerRow.value);
  
  return { start, end };
});

// 计算应该显示的随笔列表
const visibleNotes = computed(() => {
  const { start, end } = visibleRange.value;
  return notes.value.slice(start, end);
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
        await loadMoreNotes();
      }, 300);
    }
  }
};

// 加载更多随笔
const loadMoreNotes = async () => {
  if (isLoading.value || doneLoading.value) return;
  
  isLoading.value = true;
  
  try {
    if (pagination.value.has_next) {
      const nextPage = currentPage.value + 1;
      const result = await fetchNotes(nextPage);
      
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
    console.error("加载更多随笔失败:", error);
  } finally {
    // 延迟设置为false，避免快速连续触发
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
};

// 监听随笔变化，更新虚拟滚动状态
watch(() => notes.value.length, () => {
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
    console.log("开始获取随笔数据...");
    isLoading.value = true;
    const result = await fetchNotes(1);
    
    if (result.success) {
      loadStstus.value = 2;
    } else {
      loadStstus.value = 3;
    }
    
    console.log("获取到的随笔数据:", notes.value);
  } catch (error) {
    console.error("初始化随笔加载失败:", error);
    loadStstus.value = 3;
    notes.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>