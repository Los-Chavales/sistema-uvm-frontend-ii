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
const pinia = createPinia();

//app.use(createPinia())
app.use(router)
app.use(VueAxios, Axios)
app.use(VueCookies, { expires: '1h' })

app.use(pinia);
// Asigna la instancia de Pinia a la propiedad $pinia de app
app.config.globalProperties.$pinia = pinia;
app.$pinia = pinia

app.mount('#app')

if (window.Cypress) {
  window.app = app;
  window.$store =  app.$pinia.state._value;
}