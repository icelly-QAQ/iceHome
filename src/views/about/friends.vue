<style scoped>
.friend-card {
  min-height: 440px;
  max-width: 250px;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
}

.friend-image {
  height: auto;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>

<template>
  <div style="padding: 25px">
    <n-flex justify="center">
      <n-card
        v-for="friend in friends"
        :key="friend.name"
        class="friend-card"
        :title="friend.name"
        :hoverable="true"
        style="margin: 15px; width: 300px"
      >
        <template #cover>
          <div
            style="
              position: relative;
              height: 248px;
              overflow: hidden;
              border-top-left-radius: 15px;
              border-top-right-radius: 15px;
            "
          >
            <n-skeleton v-if="!friend.loaded" height="100%" :sharp="false" />
            <img
              v-show="friend.loaded"
                :src="cachedSrc(friend.img).value"
              :alt="friend.name"
              class="friend-image"
              @load="onLoad(friend)"
              @error="onError(friend)"
            />

            <img
              v-if="!friend.loaded"
                :src="cachedSrc(friend.img).value"
              style="display: none"
              @load="onLoad(friend)"
              @error="onError(friend)"
            />
          </div>
        </template>
        <n-typography>
          <p>{{ friend.info }}</p>
          <n-button tag="a" :href="friend.link" target="_blank" style="position: absolute; bottom: 15px;">
            去看看
          </n-button>
        </n-typography>
      </n-card>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import zccAvatar from '@/assets/static/friends/zcc.jpg';
import juluoAvatar from '@/assets/static/friends/juluo.jpg';
import wusuiAvatar from '@/assets/static/friends/wusui.jpg';
import zhouAvatar from '@/assets/static/friends/zhou.jpg';
import { useImageCache } from '@/composables/useImageCache'

// For remote images we will use localStorage caching via useImageCache
function cachedSrc(url: string) {
  // only cache absolute http(s) urls; local assets should remain as is
  if (/^https?:\/\//.test(url)) {
    const { src } = useImageCache(url)
    return src
  }
  // return a ref-like object for consistency
  return ref(url)
}

const friends = ref([
  {
    img: zccAvatar,
    name: "梓川城",
    info: "蓝冰の笨蛋好厚米",
    link: "/404",
    loaded: false,
  },
  {
    img: juluoAvatar,
    name: "橘络",
    info: "橘络 sama",
    link: "https://user.qzone.qq.com/1813458376",
    loaded: false,
  },
  {
    img: wusuiAvatar,
    name: "月亮杂货铺",
    info: "月亮 sama",
    link: "https://vrchat.com/home/user/usr_8e106837-abb4-456a-a6f6-acc8828b83b0",
    loaded: false,
  },
  {
    img: zhouAvatar,
    name: "舟.",
    info: "炒鸡无敌大佬！(天天不务正业打maimai)",
    link: "https://ocea.top/",
    loaded: false,
  },
  {
    img: "https://api-cdn.nyacat.cloud/api/zako/res/avatar/3d324312c2883045beacc4cc841c92cc",
    name: "KoseiRin",
    info: "NyaCat腐竹！",
    link: "https://koseirin.cn/#/",
    loaded: false,
  },
])

function onLoad(friend: any) {
  friend.loaded = true;
}

function onError(friend: any) {
  friend.loaded = false;
}
</script>
