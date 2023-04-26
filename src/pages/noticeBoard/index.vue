<template>
  <div style="background-color: #fff; min-height: calc(100vh - 84px)">
    <div class="board">
      <div class="text-xl">发布留言</div>
      <van-field
        size="large"
        :autosize="{ minHeight: 120, maxHeight: 200 }"
        custom-style="border: 1px solid #f0f0f0"
        type="textarea"
        :value="message"
        @change="(v: any) => message = v.detail"
        placeholder="随便说说啥"
      />
      <div class="flex" style="justify-content: space-between">
        <div class="flex" style="gap: 6px">
          <div>评论</div>
          <van-tag color="#d0d0d0" text-color="#000" round size="medium">{{
            itemCount
          }}</van-tag>
        </div>
        <van-button size="small" type="info" @click="leaveMessage"
          >确认发布</van-button
        >
      </div>
    </div>
    <comment-area :comment-list="commentList"></comment-area>
  </div>
  <tab-bar :value="1"></tab-bar>
</template>

<script lang="ts" setup>
import { queryComments, releaseComment } from '@/api/controller/comment'
import type { CommentVO } from '@/api/vo'
import commentArea from '@/components/commentArea/index.vue'
import tabBar from '@/components/custom-tab-bar/index.vue'
import { reactive, onMounted, ref } from 'vue'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'

const param = {
  limit: 10,
  pageOffset: 1,
}
const itemCount = ref()
const message = ref()
const commentList = reactive<CommentVO.commentInfo[]>([])
const leaveMessage = () => {
  uni.getStorage({
    key: 'userId',
    success: (res: any) => {
      releaseComment({
        blogId: 0,
        commentDate: new Date().toLocaleDateString(),
        commentatorId: res.data,
        commentContent: message.value,
      }).then(() => {
        uni.showToast({
          title: '发布成功',
          icon: 'none',
        })
        commentList.length = 0
        message.value = ''
        param.pageOffset = 1
        queryNoticeBoard()
      })
    },
    fail: () => {
      uni.showToast({
        icon: 'error',
        title: '登录后可留言',
      })
    },
  })
}
const queryNoticeBoard = () => {
  queryComments({
    blogId: 0,
    ...param,
  }).then((res: any) => {
    itemCount.value = res.count
    commentList.push(...res.blogMainComments)
  })
}

onMounted(() => {
  queryNoticeBoard()
})
onReachBottom(() => {
  if (commentList.length < itemCount.value) {
    param.pageOffset++
    queryNoticeBoard()
  }
})
onPullDownRefresh(async () => {
  param.pageOffset = 1
  commentList.length = 0
  await queryNoticeBoard()
  uni.stopPullDownRefresh()
})
</script>

<style scoped>
.reply-area {
  width: 80%;
  margin-left: 62px;
  background-color: #f0f0f0;
  margin-top: 28px;
  padding: 2px 16px 9px 9px;
  word-break: break-all;
}
.board {
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 12px;
}
.right {
  background: url('https://api.iconify.design/material-symbols/chevron-right.svg?color=%231c7ed6')
    no-repeat center center / contain;
  width: 20px;
  height: 20px;
}
</style>
