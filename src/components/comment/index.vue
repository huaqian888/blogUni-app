<template>
  <div class="comment-card">
    <div class="flex">
      <img class="avatar" :src="commentInfo.commentator.userAvatar" />
      <div style="flex: 1; margin-left: 14px; color: #495057">
        {{
          commentInfo.quotedCommentId
            ? commentInfo.replier?.userName
            : commentInfo.commentator.userName
        }}
      </div>
      <div style="color: #909399">{{ commentInfo.commentDate }}</div>
    </div>
    <div class="main">
      <div class="flex">
        <div v-if="commentInfo.quotedCommentId" style="margin-right: 6px">
          回复 @{{ commentInfo.commentator.userName }}
        </div>
        {{ commentOmit }}
      </div>
      <div
        v-if="showExpand"
        style="color: #60aefc"
        @click="showAllContent = !showAllContent"
      >
        {{ showAllContent ? '收起' : '展开' }}
      </div>
      <div
        v-if="showCommentIcon"
        class="comment-icon"
        style="opacity: 0.6"
        @click="showComment = true"
      ></div>
    </div>
    <slot name="reply"></slot>
  </div>
  <view catchtouchmove="banScroll">
    <van-popup
      :show="showComment"
      position="bottom"
      custom-style="border-radius: 8px;padding: 8px; display: flex;justify-content: space-between; align-items: center"
      @close="showComment = false"
      @before-enter="replyComment = ''"
    >
      <van-field
        type="text"
        placeholder="输入评论..."
        center
        custom-style="background-color: #f0f0f0;border-radius: 16px;height: 29px;width:360px"
        :value="replyComment"
        @change="(v: any)=>replyComment =  v.detail"
      />
      <div @click="release">发布</div></van-popup
    ></view
  >
</template>

<script setup lang="ts">
import { releaseComment } from '@/api/controller/comment'
import type { CommentVO } from '@/api/vo'
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  commentInfo: {
    type: Object as PropType<CommentVO.commentInfo>,
    default: {},
  },
  showCommentIcon: {
    type: Boolean,
    default: true,
  },
  reply: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update-comment'])
const showExpand = ref(false)
const showAllContent = ref(false)
const replyComment = ref('')
const showComment = ref(false)
const commentOmit = computed(() => {
  if (showAllContent.value) {
    return props.commentInfo.commentContent
  }
  if (props.commentInfo.commentContent.length > 60) {
    showExpand.value = true
  }
  return props.commentInfo.commentContent.slice(0, 60)
})
const release = () => {
  uni.getStorage({
    key: 'userId',
    success: (res: any) => {
      let param = {
        blogId: props.commentInfo.blogId,
        commentDate: new Date().toLocaleDateString(),
        commentatorId: res.data,
        commentContent: replyComment.value,
        commentFatherId: props.commentInfo.commentId,
      }
      if (props.reply) {
        Object.assign(param, {
          commentFatherId: props.commentInfo.commentFatherId,
          quotedCommentId: props.commentInfo.commentId,
          commentatorId: props.commentInfo.commentator.userId,
          replierId: res.data,
        })
      }
      releaseComment(param).then(() => {
        uni.showToast({
          title: '发布成功',
          icon: 'none',
        })
        emits(
          'update-comment',
          props.reply
            ? props.commentInfo.commentFatherId
            : props.commentInfo.commentId
        )
      })
    },
    fail: () => {
      uni.showToast({
        icon: 'error',
        title: '登录后可评论',
      })
    },
    complete: () => {
      showComment.value = false
    },
  })
}
</script>

<style scoped>
.comment-card {
  padding: 18px;
  border-bottom: 1px solid #f0f0f0;
}
.main {
  width: 80%;
  margin-left: 62px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
.reply {
  background-color: #f0f0f0;
}
</style>
