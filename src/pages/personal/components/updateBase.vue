<template>
  <div class="base">
    <div class="container">
      <div class="item" @click="showChooseAvatar">
        <div style="flex: 1">头像</div>
        <image class="avatar" :src="userInfo.userAvatar"></image>
        <div class="arrow"></div>
      </div>
      <div class="item" @click="showUpdateSheet">
        <div style="flex: 1">账号</div>
        <div style="margin-right: 4px">{{ userInfo.userName }}</div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
  {{ updateName }}
  <van-action-sheet
    title="修改账号"
    :round="false"
    :show="showSheet"
    @close="showSheet = false"
  >
    <van-field
      label="账号"
      placeholder="请输入新账号"
      type="text"
      maxlength="12"
      clearable
      show-word-limit
      :value="updateName"
      @change="(v: any) => updateName = v.detail"
    />
    <van-button
      custom-style="width: 90%;margin-top: 36px;display: flex;"
      type="info"
      @click="updateAccount"
      >更改</van-button
    >
  </van-action-sheet>
</template>

<script lang="ts" setup>
import { updateUserInfo } from '@/api/controller/personal'
import type { PersonalVO } from '@/api/vo'
import { getCurrentInstance, reactive, ref } from 'vue'

const instance: any = getCurrentInstance()?.proxy
const eventChannel = instance.getOpenerEventChannel()
const userInfo = reactive<PersonalVO.userInfo>({})
const showSheet = ref(false)
const updateName = ref()
eventChannel.on('param', (data: any) => {
  Object.assign(userInfo, data[0])
  updateName.value = userInfo.userName
})
const showChooseAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: function (res) {
      const tempFilePaths = res.tempFiles[0].tempFilePath
      updateUserInfo(tempFilePaths, { userId: userInfo.userId }).then(
        (data) => {
          Object.assign(userInfo, data)
          uni.showToast({
            title: '修改成功',
            icon: 'none',
          })
          eventChannel.emit('updateInfo', userInfo)
        }
      )
    },
  })
}
const showUpdateSheet = () => {
  showSheet.value = true
}
const updateAccount = () => {
  updateUserInfo('', {
    userId: userInfo.userId,
    userName: updateName.value,
  }).then((data: any) => {
    if (data?.code === 444) {
      uni.showToast({
        title: data.message,
        icon: 'error',
      })
      return
    }
    Object.assign(userInfo, data)
    uni.showToast({
      title: '修改成功',
      icon: 'none',
    })
    updateName.value = ''
    eventChannel.emit('updateInfo', userInfo)
  })
}
</script>

<style scoped>
.base {
  padding: 28px;
}

.container {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px 16px 28px 16px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 4px;
}

.item {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
}

.item:first-child {
  border-bottom: 1px solid #d7d7d7;
}

.item:nth-child(2) {
  padding-top: 26px;
}

.arrow {
  opacity: 0.5;
  width: 18px;
  height: 18px;
  transform: scale(1.8);
  background: url('https://api.iconify.design/material-symbols/chevron-right-rounded.svg?color=%23b8afb5')
    no-repeat center center / contain;
}
</style>
