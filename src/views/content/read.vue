<template>
  <div class="read-container">
    <n-spin :show="loading">
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
      <div v-else-if="error">
        <n-result 
          status="500" 
          title="500 服务器错误" 
          description="服务器出错可能说明该雇更多程序员了" 
        > 
          <template #footer> 
            <n-button @click="fetchContent">散财消灾</n-button> 
            <n-button @click="goBack">返回</n-button>
          </template> 
        </n-result>
      </div>
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
  NResult, 
  NButton 
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

<style scoped>
.read-container {
  padding: 20px;
}

.content-text {
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 16px;
}
</style>