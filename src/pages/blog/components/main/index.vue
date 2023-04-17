<template>
  <div>
    <navigator
      class="blog-card"
      v-for="item in blogList"
      :key="item.blogId"
      :hover-stay-time="1000000"
      hover-class="actived"
      :url="`/pages/blogDetail/index?info=${encodeURIComponent(
        JSON.stringify(item)
      )}`"
    >
      <div class="head flex justify-between">
        <div class="head-title">
          {{ item.blogTitle }}
        </div>
        <div class="head-featured" v-if="item.blogFeatured">精选</div>
      </div>
      <div class="body">
        <div class="body-left">
          <div class="tag">
            <van-tag
              color="#e5e5e5"
              text-color="black"
              size="large"
              v-for="tag in item.blogTag.split(',')"
              >{{ tag }}
            </van-tag>
          </div>
          <div class="summary">
            {{
              item.blogSummary.length > 36
                ? item.blogSummary.substring(0, 36) + '...'
                : item.blogSummary
            }}
          </div>
        </div>
        <div class="body-right">
          <image
            style="width: 80px; height: 100%; max-height: 120px"
            :src="item.blogCover"
          />
        </div>
      </div>
      <div class="foot">
        <div class="foot-left flex">
          <div><van-icon name="eye-o" /> {{ item.blogViewCount }}</div>
          <div><van-icon name="comment-o" /> {{ item.blogCommentCount }}</div>
        </div>
        <div class="foot-right">
          <div>
            {{ item.blogReleaseDate }}
          </div>
        </div>
      </div>
    </navigator>
    <view class="grace-loading text-center padding-sm" v-if="isLoadAll">{{
      loadingTxt
    }}</view>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBlogStore } from '../../../../store/blog/index'
import { ref } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { listBlog } from '@/api/controller/blog'

const blogStore = useBlogStore()
const { blogList, blogCount, listParam } = storeToRefs(blogStore)
const isLoadAll = ref(false)
const loadingTxt = ref('正在加载中')
onReachBottom(async () => {
  if (blogCount.value === blogList.value.length) {
    isLoadAll.value = true
    loadingTxt.value = '已加载完毕'
    setTimeout(() => {
      isLoadAll.value = false
    }, 5000)
    return
  }
  loadingTxt.value = '正在加载中'
  isLoadAll.value = true
  listParam.value.pageOffset += 1
  const res = await listBlog(listParam.value)
  setTimeout(() => {
    blogStore.setBlogCount(res.count)
    blogStore.setBlogList(res.blogList, false)
    isLoadAll.value = false
  }, 1000)
})
</script>

<style scoped lang="scss">
.blog-card {
  width: 100%;
  background: #fff;
  padding: 12px;
  margin-top: 12px;
}
.actived {
  opacity: 0.7;
}
.head {
  margin-bottom: 24px;
  min-height: 38px;
}
.head-title {
  font-weight: bold;
  line-height: 2.5em;
}
.body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 12px;
}
.summary {
  max-width: 300px;
  overflow: hidden;
  max-height: 4em;
  text-overflow: ellipsis;
}
.tag {
  display: flex;
  flex-wrap: wrap;
  flex-flow: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.head-featured {
  background: #98d4dc;
  height: 50%;
  padding: 8px 16px;
  transform: translate(14px);
}
.foot-left {
  gap: 8px;
}
</style>
