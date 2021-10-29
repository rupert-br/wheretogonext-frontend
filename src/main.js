import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/style.scss'
import 'bootstrap'
import 'leaflet'
import 'axios'

const app = createApp(App)
app.config.performance = true
app.use(store)
app.use(router).mount('#app')
