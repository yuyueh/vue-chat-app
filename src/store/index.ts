import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import { router } from '@/router';
import ChatModule from './ChatModule';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            displayName: '',
            authenticated: false,
            uid: '',
            email: '',
        },
        loading: false,
    },
    mutations: {
        login(state, { displayName, uid, email }) {
            state.user = {
                ...state.user,
                displayName,
                uid,
                email,
                authenticated: true,
            };
        },
    },
    actions: {
        async login({ commit }) {
            // login
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            const user = firebase.auth()?.currentUser as firebase.User;

            // update member info
            await firebase.firestore().collection('members').doc(user.uid).set({
                displayName: user.displayName,
                email: user.email,
            });

            // success login
            commit('login', user);
            router.push('chat');
        },
    },
    modules: {
        chat: ChatModule,
    },
});
