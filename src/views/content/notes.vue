<style scoped>
.notes-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.note-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.card-body-inner {
  padding: 12px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 卡片局部样式，整体外观由 .uniform-card 控制 */
.uniform-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.local-card {
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .n-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

<template>
  <div class="notes-container">
    <n-spin :show="loading" style="min-height: 90vh;">
      <!-- 显示错误信息 -->
      
      <div v-if="error" style="text-align: center; padding: 40px 0; margin-top: 27vh;">
        <n-card class="local-card">
          <n-result 
            status="500" 
            title="500 服务器错误" 
            description="如果不是笨蛋冰冰在瞎搞就是服务器坠机了" 
          >
          </n-result>
        </n-card>
      </div>

      <!-- 显示随笔列表 -->
      <div v-else-if="notes.length > 0">
        <div class="cards-wrapper">
          <n-grid :cols="1" :x-gap="12" :y-gap="12" responsive="screen">
            <n-grid-item v-for="note in notes" :key="note.id">
              <n-card :title="`${formatDate(note.created_at)}`" hoverable class="uniform-card local-card">
                <div class="card-body-inner">
                  <div class="note-content">
                    {{ note.content }}
                  </div>
                </div>
              </n-card>
            </n-grid-item>
          </n-grid>
        </div>

        <!-- 分页组件 -->
        <n-flex justify="center" style="position: absolute; bottom: 10px; width: 100%;">
          <div class="pagination-container">
            <n-pagination
              v-model:page="currentPage"
              :page-count="totalPages"
              :page-slot="5"
              @update:page="handlePageChange"
            />
          </div>
        </n-flex>
      </div>

      <!-- 加载中但没有错误 -->
      <div v-else-if="!loading" style="text-align: center; padding: 40px 0;">
        <p>暂无随笔数据</p>
      </div>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  NGrid, 
  NGridItem, 
  NCard, 
  NSpin,
  NPagination,
  NResult
} from 'naive-ui';

interface Note {
  id: number;
  content: string;
  created_at: string;
}

interface Pagination {
  page: number;
  per_page: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

interface NotesResponse {
  notes: Note[];
  pagination: Pagination;
}

const notes = ref<Note[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const error = ref(false);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const fetchNotes = async (page: number = 1) => {
  try {
    loading.value = true;
    error.value = false;
    // 从API获取笔记数据，支持分页
    const response = await fetch(`https://back.icelly.xyz/api/v1/notes?page=${page}&per_page=20`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: NotesResponse = await response.json();
    
    // 处理返回的数据
    notes.value = data.notes || [];
    // 更新分页信息
    currentPage.value = data.pagination?.page || page;
    totalPages.value = data.pagination?.pages || 1;
  } catch (err) {
    console.error('获取随笔列表失败:', err);
    // API调用失败时显示错误
    error.value = true;
    notes.value = [];
    totalPages.value = 1;
    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchNotes(page);
};

onMounted(() => {
  fetchNotes();
});
</script>