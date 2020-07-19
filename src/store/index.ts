import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            displayName: '',
            authenticated: false,
        },
    },
    mutations: {},
    actions: {},
    modules: {},
});
