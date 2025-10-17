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
</style>



<template>
  <n-flex style="padding: 15px">
    <n-card class="card">
      <n-h2>欢迎来到我的小窝！</n-h2>
      <n-h3>这里是我的个人主页，记录着我的点点滴滴~</n-h3>
      <n-h3>希望你能喜欢这里的一切喵~</n-h3>
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
                    <!-- 使用简单的SVG图标 -->
                    <img :src="BiliBiliIcon" class="icon" alt="B站" />
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
                <img :src="GitHubIcon" class="icon" alt="GitHub" />
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
        </n-gi>
      </n-grid>
    </n-card>
  </n-flex>
</template>



<script setup lang="ts">
import BiliBiliIcon from '@/assets/static/svglogo/bilibili.svg';
import GitHubIcon from '@/assets/static/svglogo/github.svg';
</script>