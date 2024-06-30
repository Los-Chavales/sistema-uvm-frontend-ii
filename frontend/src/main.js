import './assets/styles/base.css'
import '@fortawesome/fontawesome-free/js/all'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, Axios)
app.use(VueCookies, { expires: '1h' })

app.mount('#app')
