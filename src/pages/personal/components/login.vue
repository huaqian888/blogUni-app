<template>
  <div class="login">
    <img :src="logoSrc" style="width: 100px; height: 100px" />
    <div class="login-form">
      <div style="font-size: 20px; color: #007eb4">欢迎来到花堑Blog</div>
      <van-form style="width: 100%">
        <van-field
          placeholder="请输入账号"
          :value="userName"
          @change="
            (e: any) => {
              userName = e.detail
            }
          "
          custom-style="border-bottom: 1px solid #797979"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          password
          placeholder="请输入密码"
          :value="passwd"
          custom-style="border-bottom: 1px solid #797979;margin-top: 24px"
          @change="
            (e: any) => {
              passwd = e.detail
            }
          "
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="font-size: 12px; color: #7f7f7f; margin-top: 24px">
          温馨提示：若账号不存在则自动注册
        </div>
      </van-form>
      <div style="margin: 16px">
        <van-button
          custom-style="width: 10em"
          block
          type="info"
          @click="loginAndRegister"
          >登 录 / 注 册</van-button
        >
      </div>
    </div>
    <div class="text-sm">Copyright © www.huaqian.cn All Rights Reserved.</div>
    <div class="text-sm">网站备案号：湘ICP备17009477号</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { login, register } from '@/api/controller/personal'

const userName = ref()
const passwd = ref()
const logoSrc = `${import.meta.env.VITE_APP_BASE_URL}/logo.png`
const instance: any = getCurrentInstance()?.proxy
const eventChannel = instance.getOpenerEventChannel()
const loginAndRegister = () => {
  let userId = 0
  login({ userName: userName.value, passwd: passwd.value })
    .then(async (res: any) => {
      if (res?.code === 444) {
        res = await register({
          userName: userName.value,
          passwd: passwd.value,
        })
      }
      userId = res.userId
    })
    .finally(() => {
      if (userId) {
        uni.setStorage({
          key: 'userId',
          data: userId,
        })
        eventChannel.emit('success', userId)
        uni.navigateBack()
      } else {
        uni.showToast({
          title: '注册/登录失败',
          icon: 'error',
          mask: true,
        })
        passwd.value = ''
      }
    })
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 34px;
  padding-top: 4em;
}
.login-form {
  gap: 48px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  align-items: center;
  padding: 2em 2em;
}
</style>
