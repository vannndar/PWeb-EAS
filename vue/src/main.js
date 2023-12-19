
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router);

router.isReady().then(() => {
    router.push('/main');
  app.mount("#app");
});