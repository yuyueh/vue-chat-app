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
        setMessages(state, messages) {
            console.log(messages);
            state.messages = messages;
        },
    },
    actions: {
        async initChat({ dispatch }) {
            await dispatch('loadMembers');
            await dispatch('loadMessage');
        },
        loadMembers({ commit }) {
            return firebase
                .firestore()
                .collection('members')
                .get()
                .then(({ docs }) => {
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
                });
        },
        loadMessage({ commit, rootState, state }) {
            return firebase
                .firestore()
                .collection('messages')
                .doc('ueV66nJQ69h8jqNZvPa6') // 暫時寫死
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    const messages: any[] = [];
                    querySnapshot.forEach(function (doc) {
                        const data = doc.data();
                        messages.push({
                            id: doc.id,
                            ...data,
                            myself: data.uid === rootState.user.uid,
                            displayName: state.members[data.uid].displayName,
                        });
                    });
                    commit('setMessages', messages);
                });
        },
    },
};

export default ChatModule;
