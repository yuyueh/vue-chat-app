import * as firebase from 'firebase';
import { Module } from 'vuex';
import { Message } from '@/models/MessageModel';
import ChatEnum from '@/models/ChatTypeEnum';
import Looper from '@/common/Looper';

const roomId = 'ueV66nJQ69h8jqNZvPa6';
const itemPerPage = 10;
let messagesRef: firebase.firestore.CollectionReference;
const MemberColorsLooper = new Looper(process.env.VUE_APP_MEMBER_COLOR_LIST.split(','));
const memberDefaultColor = process.env.VUE_APP_MEMBER_DEFAULT_COLOR;
const messageRefFactory = () => {
    if (!messagesRef) {
        messagesRef = firebase
            .firestore()
            .collection('messages')
            .doc(roomId)
            .collection('messages');
    }

    return messagesRef;
};

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
        color: state.members[data.uid]?.color,
        doc,
    };
};

const ChatModule: Module<any, any> = {
    state: {
        members: {},
        messages: [],
        isNewestLoaded: true,
        loading: false,
    },
    mutations: {
        setAllMembers(state, members) {
            state.members = members;
        },
        setMessages(state, messages: Message[]) {
            state.messages = messages;
        },
        setIsNewestLoaded(state, isNewestLoaded) {
            state.isNewestLoaded = isNewestLoaded;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        pushBottomMessage(state, message: Message) {
            state.messages = [...state.messages, message];
        },
        pushTopMessages(state, messages: Message[]) {
            state.messages = [...messages, ...state.messages];
        },
        pushBottomMessages(state, messages: Message[]) {
            state.messages = [...state.messages, ...messages];
        },
    },
    actions: {
        async initChat({ dispatch }) {
            await dispatch('loadMembers');
            dispatch('listenMessage');
        },
        loadMembers({ commit, rootState }) {
            return firebase
                .firestore()
                .collection('members')
                .get()
                .then(({ docs }) => {
                    commit(
                        'setAllMembers',
                        docs.reduce(
                            (o, d, i) => ({
                                ...o,
                                [d.id]: {
                                    ...d.data(),
                                    color:
                                        rootState.user.uid === d.id
                                            ? memberDefaultColor
                                            : MemberColorsLooper.next(),
                                },
                            }),
                            {}
                        )
                    );
                });
        },
        listenMessage({ commit, rootState, state }) {
            messageRefFactory()
                .orderBy('timestamp', 'desc')
                .limit(itemPerPage)
                .onSnapshot((s) => {
                    s.docChanges()
                        .slice()
                        .reverse()
                        .forEach(function (change) {
                            if (
                                !s.metadata.hasPendingWrites &&
                                (change.type === 'modified' || change.type === 'added') &&
                                state.isNewestLoaded
                            ) {
                                commit(
                                    'pushBottomMessage',
                                    documentToMessage(rootState, state, change.doc)
                                );
                            }
                        });
                });
        },
        loadTopMessages({ commit, rootState, state }, { doc: lastDocument }) {
            return messageRefFactory()
                .orderBy('timestamp', 'desc')
                .startAfter(lastDocument)
                .limit(itemPerPage)
                .get()
                .then(({ docs }) => {
                    commit(
                        'pushTopMessages',
                        docs.slice().reverse().map(documentToMessage.bind(this, rootState, state))
                    );
                });
        },
        async loadBottomMessages({ commit, rootState, state }, { doc: targetDoc }) {
            const { docs: messageDocs, empty: emptyMessages } = await messageRefFactory()
                .orderBy('timestamp', 'asc')
                .startAfter(targetDoc)
                .limit(itemPerPage)
                .get();

            const { docs: lastMessage } = await messageRefFactory()
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get();

            commit(
                'pushBottomMessages',
                messageDocs.map(documentToMessage.bind(this, rootState, state))
            );
            setTimeout(() => {
                commit(
                    'setIsNewestLoaded',
                    emptyMessages || messageDocs[messageDocs.length - 1].id === lastMessage[0].id
                );
            }, 0);
        },
        sendMessage({ rootState }, text) {
            return messageRefFactory().add({
                type: ChatEnum.Text,
                uid: rootState.user.uid,
                text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        },
        sendSticker({ rootState }, imagePath) {
            return messageRefFactory().add({
                type: ChatEnum.Sticker,
                uid: rootState.user.uid,
                imagePath,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        },
        async queryMessageRange({ commit, rootState, state }, id) {
            commit('setLoading', true);
            const targetDoc = await messageRefFactory().doc(id).get();

            if (!targetDoc.exists) {
                alert('查無公告');
            }

            const { docs: newer } = await messageRefFactory()
                .orderBy('timestamp', 'asc')
                .startAfter(targetDoc)
                .limit(itemPerPage / 2)
                .get();

            const { docs: older } = await messageRefFactory()
                .orderBy('timestamp', 'desc')
                .startAt(targetDoc)
                .limit(itemPerPage / 2)
                .get();

            const result = [
                ...older.slice().reverse().map(documentToMessage.bind(this, rootState, state)),
                ...newer.map(documentToMessage.bind(this, rootState, state)),
            ];

            const { docs: lastMessage } = await messageRefFactory()
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get();

            commit('setMessages', result);
            commit('setIsNewestLoaded', result[result.length - 1].id === lastMessage[0].id);
            commit('setLoading', false);
        },
    },
    getters: {
        topMessage: (state) => {
            return state.messages[0];
        },
        bottomMessage: (state) => {
            return state.messages[state.messages.length - 1];
        },
    },
};

export default ChatModule;
