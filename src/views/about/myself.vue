<style scoped>
.card {
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
}

.platform-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.heatmap-container {
  margin-right: 25px;
}

.heatmap-title {
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.heatmap-info {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.debug-info {
  margin-top: 10px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}
</style>

<template>
  <n-flex style="padding: 15px">
    <n-card class="card">
      <n-grid x-gap="1" :cols="2">
        <n-gi>
          <n-h2>欢迎来到我的小窝！</n-h2>
          <n-h3>这里是我的个人主页，记录着我的点点滴滴~</n-h3>
          <n-h3>希望你能喜欢这里的一切喵~</n-h3>
        </n-gi>
        <n-gi>
          <div v-for="theme in themes" :key="theme.value" class="heatmap-container">
            <div class="heatmap-title">蓝冰のgithub热力图</div>
            <div>刷墙刷墙~</div>
            <n-heatmap 
              v-if="finalHeatmapData.length > 0" 
              :data="finalHeatmapData" 
              :color-theme="theme.value" 
            />
            <div v-else style="text-align: center; padding: 20px; color: #999;">
              <n-spin v-if="loading" size="small" />
              <div v-else>暂无数据</div>
            </div>
            
            <div class="heatmap-info">
              <div v-if="loading"></div>
              <template v-else>
                显示时间: {{ displayDateRange }} | 数据天数: {{ finalHeatmapData.length }}
              </template>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </n-card>

    <n-card class="card">
      <n-grid x-gap="60px" :cols="3">
        <n-gi>
          <div>
            <n-h2>泥嚎！我素icelly_QAQ！泥也可以叫我蓝冰、冰冰喵！</n-h2>
            <n-h3>关于我自己~</n-h3>
            <n-h3>· 是个furry控喵~ 蛋柿主推是杏仁(明日方舟)</n-h3>
            <n-h3>· 喜欢画画、音乐还有编程~</n-h3>
            <n-h3>· 现在沉迷于玩VRChat、明日方舟还有Minecraft呢</n-h3>
            <n-h3
              >· 最喜欢的颜色：<n-gradient-text type="info"
                >冰蓝色</n-gradient-text
              ></n-h3
            >
          </div>
        </n-gi>
        <n-gi>
          <n-timeline item-placement="left">
            <n-timeline-item
              type="success"
              content="万恶之源:接触计算机"
              time="2016"
            />
            <n-timeline-item type="info" content="参加编程兴趣班" time="2017" />
            <n-timeline-item type="success" content="加入NyaCat" time="2020" />
            <n-timeline-item type="info" content="第一次独立开发" time="2021" />
            <n-timeline-item
              type="success"
              content="第一次合作开发"
              time="2023"
            />
            <n-timeline-item
              type="info"
              content="第一次发布个人主页"
              time="2025"
            />
          </n-timeline>
        </n-gi>
        <n-gi>
          <n-h2>我的各个平台账号喵~</n-h2>
          <div class="platform-buttons">
            <!-- B站按钮 -->
            <n-button
              strong
              secondary
              circle
              tag="a"
              href="https://space.bilibili.com/513249515"
              target="_blank"
            >
                <template #icon>
                    <n-skeleton v-if="!biliLoaded" width="24px" height="24px" :sharp="true" />
                    <img v-show="biliLoaded" :src="BiliBiliIcon" class="icon" alt="B站" @load="biliLoaded = true" @error="biliLoaded = false" />
                    <!-- preload to trigger load event if needed -->
                    <img v-if="!biliLoaded" :src="BiliBiliIcon" style="display:none" @load="biliLoaded = true" @error="biliLoaded = false" />
                </template>
            </n-button>

            <!-- GitHub按钮 -->
            <n-button
              strong
              secondary
              circle
              tag="a"
              href="https://github.com/icelly-QAQ"
              target="_blank"
            >
              <template #icon>
                <n-skeleton v-if="!gitLoaded" width="24px" height="24px" :sharp="true" />
                <img v-show="gitLoaded" :src="GitHubIcon" class="icon" alt="GitHub" @load="gitLoaded = true" @error="gitLoaded = false" />
                <img v-if="!gitLoaded" :src="GitHubIcon" style="display:none" @load="gitLoaded = true" @error="gitLoaded = false" />
              </template>
            </n-button>

            <!-- 其他平台按钮示例 -->
            <n-button
              strong
              secondary
              circle
              tag="a"
              href="https://x.com/icelly_QAQ"
              target="_blank"
            >
              <template #icon>
                <svg class="icon" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4 35.4-21.1 62.3-54.4 75-94-32.7 19.5-69.7 33.8-108.2 41.2C765.4 194.6 721.1 174 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5-14.8 25.4-23.2 54.4-23.2 86.1 0 59.2 30.1 111.4 76 142.1-28-1.1-54.4-9-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4-14.3 3.7-29.6 5.8-44.9 5.8-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-13.8 0-27.5-0.8-41.2-2.5C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-0.5-22.2 33.2-24.3 62.3-54.4 85-88.2z"/>
                </svg>
              </template>
            </n-button>
          </div>
          <div style="margin-top: 25px;">
            <n-h2>
              RSS订阅~
            </n-h2>
            <n-h3>
              敬请期待~
            </n-h3>
          </div>
        </n-gi>
      </n-grid>
    </n-card>
  </n-flex>
</template>



<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import BiliBiliIcon from '@/assets/static/svglogo/bilibili.svg';
import GitHubIcon from '@/assets/static/svglogo/github.svg';
import axios from 'axios'

// 响应式数据
const heatmapData = ref<Array<{ timestamp: number, value: number }>>([]);
const loading = ref(false);

// 热力图需要的数据结构
interface HeatmapItem {
  timestamp: number;
  value: number;
}

// 今天日期
const todayDate = computed(() => {
  return new Date().toISOString().split('T')[0];
});

// 计算最近365条数据 - 严格保持 { timestamp: number, value: number } 格式
const finalHeatmapData = computed((): HeatmapItem[] => {
  if (!heatmapData.value.length) return [];
  
  console.log('=== 开始处理数据 ===');
  console.log('原始数据条数:', heatmapData.value.length);
  
  // 按时间戳排序（从旧到新）
  const sortedData = [...heatmapData.value].sort((a, b) => a.timestamp - b.timestamp);
  
  // 取最后365条数据（最近的一年）
  const last365Data = sortedData.slice(-365);
  
  console.log('取最后365条数据后:', last365Data.length);
  console.log('数据格式检查:', last365Data.slice(0, 3));
  console.log('=== 数据处理完成 ===');
  
  return last365Data;
});

// 计算显示的时间范围
const displayDateRange = computed(() => {
  if (!finalHeatmapData.value.length) return '无数据';
  
  const dates = finalHeatmapData.value.map(item => new Date(item.timestamp));
  const startDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const endDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  return `${startDate.toISOString().split('T')[0]} 至 ${endDate.toISOString().split('T')[0]}`;
});

// 检查缓存是否有效
const checkCache = (): HeatmapItem[] | null => {
  const cached = localStorage.getItem('github_heatmap_cache');
  if (!cached) return null;
  
  try {
    const cacheData = JSON.parse(cached);
    const now = Date.now();
    
    if (now - cacheData.timestamp < CACHE_DURATION) {
      console.log('使用缓存数据');
      return cacheData.data;
    } else {
      console.log('缓存已过期');
      localStorage.removeItem('github_heatmap_cache');
    }
  } catch (error) {
    console.error('解析缓存数据失败:', error);
    localStorage.removeItem('github_heatmap_cache');
  }
  
  return null;
};

// 缓存时间（5小时）
const CACHE_DURATION = 5 * 60 * 60 * 1000;

// 将 GitHub API 数据转换为热力图格式
const convertGitHubDataToHeatmapFormat = (githubData: any): HeatmapItem[] => {
  if (!githubData || !githubData.contributions) {
    console.error('GitHub API 返回的数据结构不正确');
    return [];
  }
  
  const heatmapData: HeatmapItem[] = [];
  
  githubData.contributions.forEach((contribution: any) => {
    if (contribution.date && contribution.count !== undefined) {
      const timestamp = new Date(contribution.date).getTime();
      heatmapData.push({
        timestamp: timestamp,
        value: contribution.count
      });
    }
  });
  
  console.log('转换后的热力图数据:', heatmapData.length, '条');
  
  // 按日期排序（从旧到新）
  const sortedData = heatmapData.sort((a, b) => a.timestamp - b.timestamp);
  console.log('排序后数据时间范围:');
  if (sortedData.length > 0) {
    const firstDate = new Date(sortedData[0].timestamp);
    const lastDate = new Date(sortedData[sortedData.length - 1].timestamp);
    console.log('最早:', firstDate.toISOString().split('T')[0]);
    console.log('最晚:', lastDate.toISOString().split('T')[0]);
  }
  
  return sortedData;
};

// 获取 GitHub 贡献数据
const getHeatmapData = async () => {
  // 先检查缓存
  const cachedData = checkCache();
  if (cachedData) {
    console.log('从缓存加载数据:', cachedData.length, '条');
    heatmapData.value = cachedData;
    return;
  }
  
  loading.value = true;
  try {
    console.log('开始请求GitHub贡献数据...');
    const response = await axios.get('https://github-contributions-api.jogruber.de/v4/icelly-QAQ');
    console.log('GitHub Contributions API响应成功，数据条数:', response.data.contributions.length);
    
    // 转换数据格式
    const convertedData = convertGitHubDataToHeatmapFormat(response.data);
    
    if (convertedData.length > 0) {
      heatmapData.value = convertedData;
      
      // 存储到缓存
      const cacheData = {
        data: convertedData,
        timestamp: Date.now()
      };
      localStorage.setItem('github_heatmap_cache', JSON.stringify(cacheData));
    } else {
      console.error('数据转换后为空');
      heatmapData.value = [];
    }
    
  } catch (error) {
    console.error('获取GitHub贡献数据失败:', error);
    // 请求失败时设置为空数组，不生成虚拟数据
    heatmapData.value = [];
  } finally {
    loading.value = false;
  }
};

// 主题配置
const themes = [
  { name: '绿色', value: 'green' },
] as const;

// 组件挂载时获取数据
onMounted(() => {
  console.log('组件挂载，开始获取热力图数据...');
  console.log('今天日期:', todayDate.value);
  getHeatmapData();
});

// icon load states
const biliLoaded = ref(false)
const gitLoaded = ref(false)
</script>