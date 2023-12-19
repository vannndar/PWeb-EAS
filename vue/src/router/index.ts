import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HelloWorld.vue';
import TheWelcome from '../components/TheWelcome.vue';
import About from '../components/WelcomeItem.vue';
import Main from '../App.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/welcome', component: TheWelcome }, 
  { path: '/about', component: About },
    { path: '/main', component: Main },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
 export default router;
