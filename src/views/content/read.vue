<style scoped>
.read-container {
  padding: 20px;
}

.content-text {
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 16px;
}

/* 卡片局部样式，整体外观由 .uniform-card 控制 */
.uniform-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.local-card {
  max-width: 316px;
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
  <div class="read-container">
    <n-spin :show="loading" style="min-height: 90vh;">
      <div v-if="content">
        <n-h1 v-if="type === 'article'">{{ content.title }}</n-h1>
        <n-h1 v-else-if="type === 'note'">随笔 #{{ id }}</n-h1>
        <n-h1 v-else>树洞 #{{ id }}</n-h1>
        
        <n-space v-if="type === 'article'" style="margin-bottom: 20px;">
          <n-tag type="info">{{ content.category }}</n-tag>
          <n-tag type="info">{{ formatDate(content.created_at) }}</n-tag>
          <n-tag type="success">浏览: {{ content.views }}</n-tag>
        </n-space>
        <n-space v-else style="margin-bottom: 20px;">
          <n-tag type="info">{{ formatDate(content.created_at) }}</n-tag>
        </n-space>
        <div class="content-text" v-html="sanitizeHtml(content.content)"></div>
      </div>

      <n-flex justify="center">
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
      </n-flex>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  NSpin, 
  NH1, 
  NSpace, 
  NTag, 
  NResult
} from 'naive-ui';

interface Content {
  id: number;
  title?: string;
  content: string;
  created_at: string;
  views?: number;
  category?: string;
}

const route = useRoute();
const router = useRouter();

const type = ref<string>(route.params.type as string);
const id = ref<string>(route.params.id as string);

const content = ref<Content | null>(null);
const loading = ref(true);
const error = ref(false);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 安全地处理HTML内容
const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  // 简单的安全过滤，移除潜在危险的脚本标签
  return html.replace(/<script[^>]*>.*?<\/script>/gi, '')
             .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
             .replace(/on\w+="[^"]*"/gi, '')
             .replace(/javascript:/gi, '');
};

const fetchContent = async () => {
  try {
    loading.value = true;
    error.value = false;
    let url = '';
    
    // 根据类型构建正确的API URL
    switch (type.value) {
      case 'article':
        url = `https://back.icelly.xyz/api/v1/articles/${id.value}`;
        break;
      case 'note':
        url = `https://back.icelly.xyz/api/v1/notes/${id.value}`;
        break;
      case 'treehole':
        url = `https://back.icelly.xyz/api/v1/treeholes/${id.value}`;
        break;
      default:
        throw new Error('不支持的内容类型');
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 检查数据是否有效
    if (!data || !data.content) {
      throw new Error('获取到的数据无效');
    }
    
    // 正确设置内容，使用从API获取的实际数据
    content.value = {
      id: data.id,
      title: data.title,
      content: data.content,
      created_at: data.created_at || new Date().toISOString(),
      views: data.views,
      category: data.category
    };
  } catch (err) {
    console.error('获取内容失败:', err);
    error.value = true;
    content.value = null;
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchContent();
});
</script>