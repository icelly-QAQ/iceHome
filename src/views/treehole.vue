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
        <h1 style="text-align: center; margin-top: 25px;">
          敬请期待~
        </h1>
        <h3>
            诶嘿~
        </h3>
      </n-flex>
    </n-card>
  </n-flex>
</template>



<script setup lang="ts">

</script>