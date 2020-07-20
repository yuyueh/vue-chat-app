import * as firebase from 'firebase';
import { Module } from 'vuex';

const ChatModule: Module<any, any> = {
    state: {
        members: {},
        messages: [],
        keepPosition: true,
    },
    mutations: {
        setAllMembers(state, members) {
            state.members = members;
        },
    },
    actions: {
        async initChatAsync({ dispatch }) {
            await dispatch('loadMembersAsync');
        },
        async loadMembersAsync({ commit }) {
            const { docs } = await firebase.firestore().collection('members').get();
            commit(
                'setAllMembers',
                docs.reduce(
                    (o, d) => ({
                        ...o,
                        [d.id]: d.data(),
                    }),
                    {}
                )
            );
        },
    },
};

export default ChatModule;
