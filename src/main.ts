import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import naive from 'naive-ui'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')

