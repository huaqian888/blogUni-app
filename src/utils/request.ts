import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { UniAdapter } from 'uniapp-axios-adapter'
export const createAxios = (configs?: AxiosRequestConfig) => {
  const instance: AxiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: Number(import.meta.env.VITE_APP_TIME_OUT),
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    adapter: UniAdapter,
    ...configs,
  })
  instance.interceptors.request.use((config: any) => {
    return config
  })

  instance.interceptors.response.use(
    (config: any) => {
      const { code, data, message } = config.data
      if (Number(code) >= 200 && Number(code) <= 299) {
        return data
      }
      if (Number(code) != 444) {
        uni.showToast({
          title: message ?? '网络开小差了...',
          icon: 'error',
          mask: false,
          position: 'center',
        })
      }
      return config.data
    },
    (err) => {}
  )

  return instance
}
