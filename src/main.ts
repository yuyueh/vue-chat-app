import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import store from './store';
import '@/assets/css/tailwind.css';
import '@/directives';

Vue.config.productionTip = false;

new Vue({
    store,
    router: createRouter(store),
    render: (h) => h(App),
}).$mount('#app');
