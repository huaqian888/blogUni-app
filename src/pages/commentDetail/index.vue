<template>
  <div class="comment-detail">
    <comment :comment-info="commentInfo" :show-comment-icon="false"></comment>
    <div style="padding: 12px; color: #868e96">
      {{ commentInfo.children.length }} 回复
    </div>
    <comment
      v-for="item in commentInfo.children"
      :key="item.commentId"
      :comment-info="item"
      :reply="true"
      @update-comment="updateComment"
    ></comment>
    <div class="bottom">
      <van-field
        type="text"
        placeholder="输入评论..."
        center
        style="width: 100%"
        custom-style="background-color: #f0f0f0;border-radius: 16px;height: 29px; width: 100%;"
        :value="commentContent"
        @change="(v: any)=>commentContent =  v.detail"
        @focus="showSend = true"
        @blur="showSend = false"
      />
      <div
        style="width: 48px; margin-left: 10px"
        v-show="showSend"
        @click="leaveMessage"
      >
        发布
      </div>
    </div>
    <div style="padding-bottom: 46px"></div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { getCurrentInstance, reactive, ref } from 'vue'
import comment from '@/components/comment/index.vue'
import type { CommentVO } from '@/api/vo'
import { queryCommentById, releaseComment } from '@/api/controller/comment'

const instance: any = getCurrentInstance()?.proxy
const eventChannel = instance.getOpenerEventChannel()
const commentInfo = reactive<CommentVO.commentInfo>({
  blogId: 0,
  commentId: 0,
  commentator: {
    userId: 0,
    userAvatar: '',
    userName: '',
  },
  commentContent: '',
  commentDate: '',
  children: [],
})
const commentContent = ref('')
const showSend = ref(false)
onLoad((v: any) => {
  Object.assign(commentInfo, JSON.parse(decodeURIComponent(v?.commentInfo)))
})
const updateComment = (commentId: number) => {
  queryCommentById(commentId).then((res: any) => {
    Object.assign(commentInfo, res)
    eventChannel.emit('success', res)
  })
}
const leaveMessage = () => {
  uni.getStorage({
    key: 'userId',
    success: (res: any) => {
      releaseComment({
        blogId: commentInfo.blogId,
        commentDate: new Date().toLocaleDateString(),
        commentatorId: res.data,
        commentContent: commentContent.value,
        commentFatherId: commentInfo.commentId,
      }).then(() => {
        uni.showToast({
          title: '发布成功',
          icon: 'none',
        })
        commentContent.value = ''
        updateComment(commentInfo.commentId)
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
</script>

<style scoped>
.comment-detail {
  background-color: #fff;
  min-height: calc(100vh - 46px);
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  border-top: 1px solid #f0f0f0;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
</style>
