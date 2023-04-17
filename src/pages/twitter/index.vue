<template>
  <twitter-main></twitter-main>
  <tab-bar :value="2"></tab-bar>
</template>

<script lang="ts" setup>
import tabBar from '@/components/custom-tab-bar/index.vue'
import twitterMain from './components/index.vue'
</script>

<style scoped></style>
