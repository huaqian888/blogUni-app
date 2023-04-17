import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'

const towxml = require('/wxcomponents/towxml/index')
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$towxml = towxml
  app.use(Pinia.createPinia())
  return {
    app,
    Pinia,
  }
}
