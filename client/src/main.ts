import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/styles/index.scss'

import './plugins/bootstrap'

createApp(App).use(store).use(router).mount('#app')
