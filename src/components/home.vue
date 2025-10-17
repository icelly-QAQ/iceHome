<style scoped>
#hero-card {
  width: 700px;
  margin-top: 30vh;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.2);
}
</style>



<template>
  <n-flex justify="center" class="home">
    <n-card id="hero-card" :bordered="false">
        <n-flex justify="center">
            <h1>Home</h1>
        </n-flex>
    </n-card>
  </n-flex>
</template>



<script setup lang="ts">
</script>
