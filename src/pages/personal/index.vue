<template>
  <personal-center></personal-center>
  <tab-bar :value="3"></tab-bar>
</template>

<script lang="ts" setup>
import personalCenter from './components/personalCenter.vue'
import tabBar from '@/components/custom-tab-bar/index.vue'
</script>

<style scoped></style>
