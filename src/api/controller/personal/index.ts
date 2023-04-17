import type { PersonalDTO } from '@/api/dto'
import { axios } from '../../index'
export async function queryBloggerInfo() {
  const bloggerInfo: any = await axios.post('/user/queryBloggerInfo')
  return bloggerInfo
}
export async function queryUserInfo(param: any) {
  const userInfo: any = await axios.post('/user/queryUserInfo', param)
  return userInfo
}

export async function login(param: PersonalDTO.loginDTO) {
  return new Promise((resolve, reject) => {
    axios.post('/user/login', param).then(resolve).catch(reject)
  })
}

export async function register(param: PersonalDTO.loginDTO) {
  await axios.post('/user/register', param)
  return login(param)
}

export async function updateUserInfo(tempFilePaths: string = '', param: any) {
  return new Promise((resolve) => {
    let url = '/user/updateUserInfo'
    if (tempFilePaths) {
      uni.uploadFile({
        url: import.meta.env.VITE_APP_BASE_URL + url,
        filePath: tempFilePaths,
        name: 'avatar',
        formData: param,
        success: (res) => {
          resolve(JSON.parse(res.data).data)
        },
      })
    } else {
      axios.post(url, param).then((res) => {
        resolve(res)
      })
    }
  })
}
