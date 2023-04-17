<template>
  <div class="blogDetail padding-sm">
    <van-skeleton title avatar row="3" :loading="loading">
      <div>
        <div class="title">{{ blogInfo.blogTitle }}</div>
        <div class="blog-info flex">
          <img class="avatar" :src="blogInfo.blogCover" />
          <div>
            <div>花堑</div>
            <div class="flex">
              <div class="spilt">
                {{ getTimegap(new Date(), new Date(blogInfo.blogReleaseDate)) }}
              </div>
              <div class="spilt">阅读{{ blogInfo.blogViewCount }}</div>
              <div>评论{{ blogInfo.blogCommentCount }}</div>
            </div>
          </div>
        </div>
        <div
          class="cover"
          v-if="blogInfo.blogCover && !blogInfo.blogCover.includes('default')"
        >
          <img
            class="preload"
            :src="blogInfo.blogCover"
            :data-src="blogInfo.blogCover"
            alt="封面"
            :style="{
              width: '100%',
              objectFit: 'cover',
              height: coverHeight + 'px',
              visibility: showCover as any,
            }"
          />
        </div>
        <towxml class="towxml" :nodes="parseMd(blogInfo.blogContent)" />
      </div>
    </van-skeleton>
  </div>
  <div class="toolbar">
    <van-field
      type="text"
      placeholder="输入评论..."
      center
      custom-style="background-color: #f0f0f0; border-radius: 16px; height: 29px; width: 320px"
    />
    <div class="tools flex">
      <van-icon name="bars" size="24px" @click="showNav = true" />
      <van-icon name="chat-o" size="24px" />
    </div>
  </div>
  <div style="padding: 23px"></div>
  <view catchtouchmove="banScroll">
    <van-popup
      :show="showNav"
      position="bottom"
      custom-style="height: 50%; border-radius: 8px"
      @close="showNav = false"
      @before-enter="initSelected"
    >
      <div class="cancel" @click="showNav = false"></div>
      <div class="dir">目录</div>
      <list
        :nav-list="navList"
        :gap="15"
        @click.stop="toTarget"
        style="top: 64px; left: 10px; position: absolute; padding-bottom: 40px"
      >
      </list> </van-popup
  ></view>
</template>

<script lang="ts" setup>
import { queryBlogDetails } from '@/api/controller/blog'
import type { BlogDTO } from '@/api/dto'
import { getTimegap } from '@/utils/date'
import { onLoad, onPageScroll, onReady } from '@dcloudio/uni-app'
import { getCurrentInstance, reactive, computed, ref } from 'vue'
import list from './components/list/index.vue'

type NavItem = {
  title: string
  top: number
  type: number
  selected: boolean
}
let instance = getCurrentInstance()

let topGap: number = 0
onPageScroll((v: any) => {
  topGap = v.scrollTop
})

const initSelected = async () => {
  navList.map((v) => (v.selected = false))
  if (navList.length && navList[0].top >= topGap) {
    navList[0].selected = true
    return
  }
  for (let i = 0; i < navList.length; i++) {
    if (navList[i].top <= topGap && navList[i + 1]?.top > topGap) {
      navList[i].selected = true
      break
    }
    if (i == navList.length - 1) {
      navList[i].selected = true
    }
  }
}

const loading = ref(true)
const blogInfo = reactive<BlogDTO.blogInfo>({} as any)
onLoad((option: any) => {
  Object.assign(
    blogInfo,
    JSON.parse(decodeURIComponent(option?.info)) as BlogDTO.blogInfo
  )
  queryBlogDetails({ blogId: blogInfo.blogId }).then((res) => {
    Object.assign(blogInfo, res)
    loading.value = false
  })
})
const parseMd = computed(() => (str: string) => {
  if (str) {
    let { appContext } = getCurrentInstance() as any
    return appContext.config.globalProperties.$towxml(str, 'markdown')
  }
  return null
})

const showCover = ref('hidden')
const coverHeight = ref()
const showNav = ref(false)
const navList = reactive<NavItem[]>([])
const initNavList = (str: string) => {
  let arr = str.split('\n')
  arr = arr.filter((v) => v.startsWith('#'))
  navList.length = 0
  for (let i = 0; i < arr.length; i++) {
    let [num, ...title] = arr[i].split(' ')
    let node: NavItem = {
      title: title.join(' '),
      top: 0,
      type: num.length,
      selected: false,
    }
    navList.push(node)
  }
}
const preLoadImg = () => {
  return new Promise<void>((resolve) => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select('.preload')
      .boundingClientRect((v) => {
        uni.getImageInfo({
          src: (v as any).dataset.src,
          success: function (image) {
            coverHeight.value = image.height
            instance?.proxy?.$nextTick(() => {
              showCover.value = 'visible'
              resolve()
            })
          },
        })
      })
      .exec()
  })
}
const initTop = (cnt: number) => {
  if (cnt > 6) {
    return
  }
  let query = uni.createSelectorQuery().in(instance)
  query
    .selectAll(`.blogDetail >>> .h2w__h${cnt}`)
    .fields({ size: true, rect: true }, (data: any) => {
      if (data.length > 0) {
        let idx = 0
        for (let i = 0; i < navList.length; i++) {
          if (navList[i].type === cnt) {
            navList[i].top = data[idx++].top
          }
        }
      }
      initTop(cnt + 1)
    })
  query.exec()
}
const toTarget = (top: number, key: number) => {
  if (top) {
    navList.map((v) => (v.selected = false))
    navList[key].selected = true
    topGap = top
    uni.pageScrollTo({ scrollTop: top, duration: 300 })
  }
}
onReady(async () => {
  initNavList(blogInfo.blogContent)
  await preLoadImg()
  setTimeout(async () => {
    await initTop(1)
  }, 500)
})
</script>

<style scoped>
.blogDetail {
  background-color: #fff;
  height: 100%;
  min-height: 100vh;
}

.title {
  font-size: 1.4rem;
}

.blog-info {
  gap: 12px;
  margin-top: 12px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.spilt {
  margin-right: 0.25rem;
}

.cover {
  margin-top: 12px;
}

.article {
  margin-top: 12px;
}

.toolbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  border-top: 1px solid #f0f0f0;
  justify-content: space-between;
  background-color: #fff;
}

.tools {
  width: 100%;
  justify-content: space-around;
}

.cancel {
  background: url('https://api.iconify.design/fluent-mdl2/cancel.svg') no-repeat
    center center / contain;
  width: 20px;
  position: fixed;
  top: 434px;
  left: 5%;
  height: 20px;
  z-index: 101;
}

.blogDetail >>> .h2w__img {
  width: 100% !important;
  object-fit: cover;
}

.dir {
  position: fixed;
  font-weight: 700;
  padding: 16px 189px;
  width: 100%;
  text-align: left;
  background-color: #fff;
  z-index: 100;
  border-bottom: 1px solid #f0f0f0;
}
</style>
