<template>
  <div class="blog">
    <div class="serach">
      <van-search
        type="text"
        placeholder="请输入关键词搜索"
        shape="round"
        @change="debounceQueryBlogList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { listBlog } from '@/api/controller/blog'
import { onMounted } from 'vue'
import { useBlogStore } from '../../../../store/blog/index'
import debounce from '../../../../utils/debounce'
import { onPullDownRefresh } from '@dcloudio/uni-app'

const blogStore = useBlogStore()
const queryBlogList = async (e?: any) => {
  blogStore.setBlogTitle(e?.detail)
  blogStore.setPageOffset(1)
  const res = await listBlog(blogStore.getListParam)
  blogStore.setBlogCount(res.count)
  blogStore.setBlogList(res.blogList, true)
}
const debounceQueryBlogList = debounce(queryBlogList)
onMounted(() => {
  queryBlogList()
})
onPullDownRefresh(async () => {
  await queryBlogList()
  uni.stopPullDownRefresh()
})
</script>

<style lang="scss" scoped></style>
