<style scoped>
#hero-card {
  border-radius: 15px;
  width: auto;
  height: auto;
  margin-top: 35vh;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.2);
}
</style>

<template>
  <n-flex justify="center" class="home">
    <n-card id="hero-card" :bordered="false">
      <n-flex justify="center" vertical align="center" style=" min-width: 300px; min-height: 150px;">
        <n-spin v-if="loading" size="small" />
        <h1 v-else style="text-align: center; margin-top: 25px;">
          {{ heroMessage }}
        </h1>
        <n-h2 style="margin-top: 25px;">
          icelly_QAQ の 小窝
        </n-h2>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'

const heroMessage = ref("平平淡淡才是真，好好生活吧");
const loading = ref(false)

const getHeroMessage = async () => {
  loading.value = true
  try {
    // 方法1：使用 encode=text 参数直接返回文本
    const response = await axios.get('https://v1.hitokoto.cn/?encode=text')
    console.log('API响应:', response) // 添加日志查看响应
    
    heroMessage.value = response.data.replace(/[。]+$/, ''); // 去除结尾标点符号

  } catch (error) {
    console.error('获取数据失败:', error)
    heroMessage.value = '获取一言失败，请重试'
  } finally {
    loading.value = false
  }
}

// 组件挂载时自动获取
onMounted(() => {
  getHeroMessage()
})
</script>