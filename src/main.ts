import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import './assets/main.css';
import 'virtual:uno.css';
import 'animate.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';


const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);

app.use(router);

app.mount('#app');
