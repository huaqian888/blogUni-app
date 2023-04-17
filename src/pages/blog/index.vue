<template>
  <blog-top></blog-top>
  <blog-main class="main"></blog-main>
  <tab-bar :value="0"></tab-bar>
</template>

<script lang="ts" setup>
import blogTop from './components/top/index.vue'
import blogMain from './components/main/index.vue'
import tabBar from '@/components/custom-tab-bar/index.vue'
</script>

<style scoped lang="scss"></style>
