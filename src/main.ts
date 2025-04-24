import { createApp } from 'vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import './style.css';
import App from './App.vue';

const app = createApp(App).use(router).use(vuetify);

app.mount('#app');
