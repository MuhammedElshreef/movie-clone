import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import VueProgressBar from '@aacassandra/vue3-progressbar'

const options = {
  color: '#1E89DE',
  failedColor: '#874b4b',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueProgressBar, options)
app.use(MotionPlugin)

app.mount('#app')
