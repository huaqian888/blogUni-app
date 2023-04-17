<template>
  <div class="twitter flex" v-for="item in twitterList" :key="item.twitterId">
    <img class="avatar" :src="bloggerAvatar" />
    <div class="content">
      <div>{{ item.twitterContent }}</div>
      <div class="time flex">
        <div class="icon"></div>
        <div style="font-size: 12px">
          {{ releaseDateTime(item.twitterReleaseDateTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryTwitters } from '@/api/controller/twitter'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { computed, onMounted, reactive, ref } from 'vue'
import type { TwitterDTO } from '@/api/dto/twitter'
import type { pagination } from '@/common/types'

const param = reactive<pagination>({
  limit: 10,
  pageOffset: 1,
})
const twitterList = reactive<TwitterDTO.twitterInfo[]>([])
const twitterCount = ref()
const bloggerAvatar = `${import.meta.env.VITE_APP_BASE_URL}/default.png`
onMounted(() => {
  twitterList.length = 0
  queryTwitter()
})
onPullDownRefresh(async () => {
  twitterList.length = 0
  await queryTwitter()
  uni.stopPullDownRefresh()
})
onReachBottom(() => {
  param.pageOffset! += 1
  queryTwitter()
})
const queryTwitter = async () => {
  let { twitterList: list, count } = await queryTwitters(param)
  twitterList.push(...list)
  twitterCount.value = count
}
const releaseDateTime = computed(() => (item: any) => {
  let date = new Date(item)
  let curDate =
    date.getFullYear() +
    '年' +
    (date.getMonth() + 1) +
    '月' +
    date.getDate() +
    '日' +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return curDate
})
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 22px;
}
.twitter {
  padding: 32px 16px;
}
.content {
  background-color: #91d5ff;
  border-radius: 14px;
  height: 100px;
  width: 82%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
}
.content::before {
  content: '';
  position: absolute;
  left: -0.28em;
  top: 1.1em;
  border: 1px solid #91d5ff;
  padding: 4px;
  background: #91d5ff;
  transform: rotate(45deg);
}
.icon {
  width: 18px;
  opacity: 0.5;
  margin-right: 6px;
  background: url('https://api.iconify.design/ic/outline-access-time.svg')
    no-repeat center center / contain;
}
</style>
