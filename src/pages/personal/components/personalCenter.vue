<template>
  <div
    class="top flex"
    @click="userInfo.userId == 0 ? jumpToLogin() : jumpToUpdate()"
  >
    <img :src="userInfo.userAvatar" class="avatar" />
    <div class="text-bold" style="margin-top: 12px">
      {{ userInfo.userName }}
    </div>
    <div
      v-show="userInfo.userId != 0"
      class="logout icon"
      @click.stop="logout"
    ></div>
  </div>
  <div class="main">
    <div class="text-bold">关于</div>
    <div class="flex" style="margin-top: 28px">
      <img class="avatar" :src="bloggerInfo.userAvatar" alt="作者头像" />
      <div class="flex about">
        <div class="text-bold">{{ bloggerInfo.userName }}</div>
        <div style="font-size: 12px; line-height: 2">
          不知名前端开发攻城师，立志向全栈攻城师看齐
          的算法小白，欢迎大佬们看看蒟蒻de小博客
        </div>
      </div>
    </div>
    <div
      class="text-bold"
      style="margin-right: 4px; text-align: center; margin-top: 58px"
    >
      联系我
    </div>
    <div class="info">
      <div class="info-item" style="grid-column: 1 / 2">
        <div class="wx icon"></div>
        <div class="text-sm">{{ bloggerInfo.userWx }}</div>
      </div>
      <div class="info-item" style="grid-column: 2 / 3">
        <div class="qq icon"></div>
        <div class="text-sm">{{ bloggerInfo.userQQ }}</div>
      </div>
      <div class="info-item" style="grid-column: 1 / 3">
        <div class="github icon"></div>
        <div class="text-sm">{{ bloggerInfo.userGit }}</div>
      </div>
    </div>
  </div>
  <div style="background: #fff; padding-bottom: 215px"></div>
</template>

<script setup lang="ts">
import { queryBloggerInfo, queryUserInfo } from '@/api/controller/personal'
import { reactive, onMounted } from 'vue'

type blogger = {
  userName?: string
  userAvatar?: string
  userGit?: string
  userWx?: string
  userQQ?: string
}
const userInfo = reactive({
  userId: 0,
  userName: '点击登录',
  userAvatar: `${import.meta.env.VITE_APP_BASE_URL}/logo.png`,
})
const bloggerInfo = reactive<blogger>({})
onMounted(() => {
  uni.getStorage({
    key: 'userId',
    success: (res: any) => {
      queryUserInfo({ userId: res.data }).then((data) => {
        Object.assign(userInfo, data)
      })
    },
  })
  queryBloggerInfo().then((res) => {
    Object.assign(bloggerInfo, res)
  })
})
const jumpToLogin = () => {
  uni.navigateTo({
    url: '/pages/personal/components/login',
    events: {
      success: (data: any) => {
        queryUserInfo({ userId: data }).then((data) => {
          Object.assign(userInfo, data)
        })
      },
    },
  })
}
const jumpToUpdate = () => {
  uni.navigateTo({
    url: '/pages/personal/components/updateBase',
    events: {
      updateInfo: (val: any) => {
        Object.assign(userInfo, val)
      },
    },
    success: function (res) {
      res.eventChannel.emit('param', [userInfo])
    },
  })
}
const logout = () => {
  uni.removeStorage({
    key: 'userId',
    success: (result) => {
      Object.assign(userInfo, {
        userId: 0,
        userName: '点击登录',
        userAvatar: `${import.meta.env.VITE_APP_BASE_URL}/logo.png`,
      })
    },
  })
}
</script>

<style scoped>
.top {
  padding: 16px;
}
.text-bold {
  font-size: 20px;
  font-weight: 600;
}
.main {
  background-color: #fff;
  padding: 32px 16px;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 12px;
}
.info {
  display: grid;
  grid-template-columns: repeat(3);
  justify-content: center;
  grid-row-gap: 12px;
}
.about {
  width: 80%;
  flex-direction: column;
  justify-content: space-between;
}
.info-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  height: 120%;
  align-items: center;
  place-items: center;
}
.icon {
  width: 24px;
  height: 24px;
}
.qq {
  background: url('https://api.iconify.design/ri/qq-fill.svg') no-repeat center
    center / contain;
}
.wx {
  background: url('https://api.iconify.design/ic/round-wechat.svg') no-repeat
    center center / contain;
}
.github {
  background: url('https://api.iconify.design/mdi/github.svg') no-repeat center
    center / contain;
}
.logout {
  background: url('https://api.iconify.design/ic/baseline-logout.svg') no-repeat
    center center / contain;
  position: absolute;
  right: 45px;
  top: 30px;
}
</style>
