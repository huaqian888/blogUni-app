<template>
  <div class="commentArea">
    <comment
      v-for="item in commentList"
      :key="item.commentId"
      :comment-info="item"
      @update-comment="updateComment"
    >
      <template #reply>
        <div class="reply-area" v-if="item.children.length != 0">
          <div
            v-for="reply in item.children.slice(0, 2)"
            :key="reply.commentId"
            style="margin-top: 12px"
          >
            <div v-if="!reply.replier">
              {{ reply.commentator.userName }} ：{{ reply.commentContent }}
            </div>
            <div v-else>
              {{ reply.commentator.userName }} 回复 @{{
                reply.replier.userName
              }}
              ：{{ reply.commentContent }}
            </div>
          </div>
          <div
            @click="jumpToDetail(item)"
            class="flex"
            style="color: #1c7ed6; margin-top: 12px"
            v-if="item.children.length > 2"
          >
            共{{ item.children.length }}条回复 <view class="right"></view>
          </div>
        </div>
      </template>
    </comment>
  </div>
</template>

<script lang="ts" setup>
import { queryCommentById } from '@/api/controller/comment'
import type { CommentVO } from '@/api/vo'
import { reactive, type PropType, watch } from 'vue'

const props = defineProps({
  commentList: {
    type: Array as PropType<CommentVO.commentInfo[]>,
    default: [],
  },
})
const commentList = reactive<CommentVO.commentInfo[]>([])
const updateComment = (commentId: number) => {
  let index = 0
  commentList.forEach((v, i) => {
    if (v.commentId === commentId) {
      index = i
    }
  })
  queryCommentById(commentId).then((res: any) => {
    commentList.splice(index, 1, res)
  })
}
const jumpToDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/commentDetail/index?commentInfo=${encodeURIComponent(
      JSON.stringify(item)
    )}`,
    events: {
      success: (data: any) => {
        let index = 0
        commentList.forEach((v, i) => {
          if (v.commentId === data.commentId) {
            index = i
          }
        })
        commentList.splice(index, 1, data)
      },
    },
  })
}
watch(props.commentList, (v: any) => {
  commentList.length = 0
  commentList.push(...v)
})
</script>

<style scoped>
.commentArea {
  background-color: #fff;
}
.reply-area {
  width: 80%;
  margin-left: 62px;
  background-color: #f0f0f0;
  margin-top: 28px;
  padding: 2px 16px 9px 9px;
  word-break: break-all;
}
.right {
  background: url('https://api.iconify.design/material-symbols/chevron-right.svg?color=%231c7ed6')
    no-repeat center center / contain;
  width: 20px;
  height: 20px;
}
</style>
