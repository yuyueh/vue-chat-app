import * as firebase from 'firebase';
import { Module } from 'vuex';
import { Message } from '@/models/MessageModel';

const roomId = 'ueV66nJQ69h8jqNZvPa6';
const itemPerPage = 10;

const documentToMessage = (
    rootState: any,
    state: any,
    doc: firebase.firestore.DocumentData
): Message => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        myself: data.uid === rootState.user.uid,
        displayName: state.members[data.uid]?.displayName,
        doc,
    };
};

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
        pushLastMessage(state, message: Message) {
            state.messages = [...state.messages, message];
        },
        pushLastMessages(state, messages: Message[]) {
            console.log(messages);
            state.messages = [...state.messages, ...messages];
        },
        pushEarlyMessages(state, messages: Message[]) {
            console.log(messages);
            state.messages = [...messages, ...state.messages];
        },
    },
    actions: {
        async initChat({ dispatch }) {
            await dispatch('loadMembers');
            dispatch('listenMessage');
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
        listenMessage({ commit, rootState, state }) {
            firebase
                .firestore()
                .collection('messages')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .limit(itemPerPage)
                .onSnapshot((s) => {
                    s.docChanges().forEach(function (change) {
                        if (
                            (change.type === 'modified' && s.metadata.hasPendingWrites) ||
                            change.type === 'added'
                        ) {
                            commit(
                                'pushLastMessage',
                                documentToMessage(rootState, state, change.doc)
                            );
                        }
                    });
                });
        },
        loadMessagesBefore({ commit, rootState, state }, { doc: lastDocument }) {
            return firebase
                .firestore()
                .collection('messages')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .startAfter(lastDocument)
                .limit(itemPerPage)
                .get()
                .then(({ docs }) => {
                    commit(
                        'pushLastMessages',
                        docs.map(documentToMessage.bind(this, rootState, state))
                    );
                });
        },
        loadMessagesAfter({ commit, rootState, state }, { doc: firstDocument }) {
            return firebase
                .firestore()
                .collection('messages')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .endBefore(firstDocument)
                .limit(itemPerPage)
                .get()
                .then(({ docs }) => {
                    commit(
                        'pushEarlyMessages',
                        docs.map(documentToMessage.bind(this, rootState, state))
                    );
                });
        },
    },
    getters: {
        messages: (state) => {
            return state.messages.slice().reverse();
        },
        firstMessage: (state) => {
            return state.messages[state.messages.length - 1];
        },
        lastMessage: (state) => {
            return state.messages[0];
        },
    },
};

export default ChatModule;
