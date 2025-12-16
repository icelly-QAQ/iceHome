<style scoped>
.articles-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.card-body-inner {
  padding: 0px 13px 0px 13px;
  min-height: 100px;
  position: relative;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.card-footer {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 减小卡片标题与内容间距 */
.uniform-card ::v-deep .n-card__header {
  margin-bottom: 6px;
}
.uniform-card ::v-deep .n-card__content {
  padding-top: 6px;
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
  background: rgba(255, 255, 255, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .n-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

<template>
  <div class="articles-container">
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

      <!-- 显示文章列表 -->
      <div v-else-if="articles.length > 0">
        <div class="cards-wrapper">
          <n-grid :cols="2" :x-gap="12" :y-gap="12" responsive="screen">
            <n-grid-item v-for="article in articles" :key="article.id">
              <n-card :title="article.title" hoverable class="uniform-card local-card">
                <template #header-extra>
                  <n-tag type="info">{{ article.category }}</n-tag>
                </template>

                <div class="card-body-inner">
                  <n-ellipsis :line-clamp="3" class="article-content" :tooltip="false">
                    {{ removeHtmlTags(article.content) }}
                  </n-ellipsis>

                  <n-space justify="space-between" align="center" class="card-footer">
                    <n-space>
                      <n-tag type="info">{{ formatDate(article.created_at) }}</n-tag>
                      <n-tag type="success">浏览: {{ article.views }}</n-tag>
                    </n-space>
                    <n-button 
                      type="primary" 
                      text
                      tag="a"
                      :href="`#/content/article/${article.id}`"
                    >
                      阅读更多
                    </n-button>
                  </n-space>
                </div>
              </n-card>
            </n-grid-item>
          </n-grid>
        </div>

        <!-- 分页组件 -->
        <div class="pagination-container">
          <n-card class="local-card" style="width: fit-content; padding: 2px 2px;">
            <n-pagination
              v-model:page="currentPage"
              :page-count="totalPages"
              :page-slot="5"
              @update:page="handlePageChange"
            />
          </n-card>
        </div>
      </div>

      <!-- 加载中但没有错误 -->
      <div v-else-if="!loading" style="text-align: center; padding: 40px 0;">
        <p>暂无文章数据</p>
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
  NEllipsis, 
  NSpace, 
  NTag,
  NButton, 
  NSpin,
  NPagination,
  NResult
} from 'naive-ui';

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  views: number;
  category: string;
}

interface Pagination {
  page: number;
  per_page: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

interface ArticlesResponse {
  articles: Article[];
  pagination: Pagination;
}

const articles = ref<Article[]>([]);
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

// 移除HTML标签函数
const removeHtmlTags = (html: string): string => {
  if (!html) return '';
  
  // 首先移除所有HTML标签
  let plainText = html.replace(/<[^>]*>/g, '');
  
  // 清理可能残留的不完整标签（如果截断发生在标签内部）
  plainText = plainText.replace(/<[^>]*$/g, '');
  
  return plainText;
};

const fetchArticles = async (page: number = 1) => {
  try {
    loading.value = true;
    error.value = false;
    // 尝试从API获取数据
    const response = await fetch(`https://back.icelly.xyz/api/v1/articles?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ArticlesResponse = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      articles.value = data.articles;
      currentPage.value = data.pagination?.page || page;
      totalPages.value = data.pagination?.pages || 1;
    } else {
      // 如果API返回空数据，显示错误
      console.log('API返回空数据');
      error.value = true;
      articles.value = [];
    }
  } catch (err) {
    console.error('获取文章列表失败:', err);
    // 在API调用失败时显示错误
    error.value = true;
    articles.value = [];
    totalPages.value = 1;
    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchArticles(page);
};

onMounted(() => {
  fetchArticles();
});
</script>