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

// 5小时的毫秒数
const CACHE_DURATION = 5 * 60 * 60 * 1000

const getHeroMessage = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://v1.hitokoto.cn/?encode=text')
    console.log('API响应:', response)
    
    const newMessage = response.data.replace(/[。]+$/, '');
    heroMessage.value = newMessage;
    
    // 存储数据和请求时间
    const cacheData = {
      message: newMessage,
      timestamp: Date.now()
    }
    localStorage.setItem('hitokoto_cache', JSON.stringify(cacheData))
    
  } catch (error) {
    console.error('获取数据失败:', error)
    heroMessage.value = '获取一言失败，请重试'
  } finally {
    loading.value = false
  }
}

const checkCache = () => {
  const cached = localStorage.getItem('hitokoto_cache')
  
  if (cached) {
    try {
      const cacheData = JSON.parse(cached)
      const now = Date.now()
      const timePassed = now - cacheData.timestamp
      
      if (timePassed < CACHE_DURATION) {
        // 5小时内，使用缓存数据
        heroMessage.value = cacheData.message
        console.log('使用缓存数据，剩余冷却时间:', Math.round((CACHE_DURATION - timePassed) / 1000 / 60), '分钟')
        return false // 不需要请求
      } else {
        // 超过5小时，清除过期缓存
        localStorage.removeItem('hitokoto_cache')
        console.log('缓存已过期，重新请求')
      }
    } catch (e) {
      console.error('解析缓存数据失败:', e)
      localStorage.removeItem('hitokoto_cache')
    }
  }
  
  return true // 需要请求
}

// 组件挂载时检查缓存
onMounted(() => {
  if (checkCache()) {
    // 如果没有缓存或缓存过期，则请求新数据
    getHeroMessage()
  }
})
</script>