<template>
  <van-tabbar :active="value" @change="tabChange">
    <van-tabbar-item v-for="item in tabList" :key="item.text" :icon="item.icon">{{
      item.text
    }}</van-tabbar-item>
  </van-tabbar>
  <view style="padding-bottom: calc(50px + env(safe-area-inset-bottom))" />
</template>

<script lang="ts" setup>
import type { TabItem } from "@/common/types";
import { reactive } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});
const tabList = reactive<TabItem[]>([
  {
    icon: "wap-home-o",
    text: "首页",
    path: "/pages/blog/index",
  },
  {
    icon: "comment-o",
    text: "留言板",
    path: "/pages/noticeBoard/index",
  },
  {
    icon: "edit",
    text: "说说",
    path: "/pages/twitter/index",
  },
  {
    icon: "contact",
    text: "我",
    path: "/pages/personal/index",
  },
]);
const tabChange = ({ detail }: any) => {
  uni.switchTab({
    url: tabList[detail].path,
  });
};
</script>

<style scoped></style>
