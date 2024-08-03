import './assets/styles/base.css'
import '@fortawesome/fontawesome-free/js/all'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useEventsStore } from './stores/events';

import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

const pinia = createPinia();
const app = createApp(App)

//app.use(createPinia())
app.use(router)
app.use(VueAxios, Axios)
app.use(VueCookies, { expires: '1h' })
app.use(pinia);

app.mount('#app')

if (window.Cypress) {
  window.app = app;
  // Exponer la store de Pinia
  window.getStoreState = () => {
    const eventsStore = useEventsStore();
    return eventsStore.$state;
  };
}