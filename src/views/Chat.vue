<template>
    <div class="flex flex-col h-screen">
        <Loading v-if="loading" />
        <ChatHeader />
        <Announcement @anchorTo="anchorToMessage" />
        <div
            ref="messages"
            class="flex-grow overflow-y-auto"
            v-scroll-keep="atBottom && isNewestLoaded"
            @scroll-top-reach="loadTopMessages()"
            @scroll-bottom-reach="loadBottomMessages()"
            @leave-from-bottom="leave()"
        >
            <Message
                v-for="message in messages"
                :key="message.id"
                :message="message"
                :ref="'message-' + message.id"
            />
        </div>
        <MessageInput @sendMessage="sendMessage" @sendSticker="sendSticker" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Announcement from '@/components/Announcement.vue';
import ChatHeader from '@/components/ChatHeader.vue';
import Loading from '@/components/Loading.vue';
import Message from '@/components/Message.vue';
import MessageInput from '@/components/MessageInput.vue';

export default Vue.extend({
    components: {
        Announcement,
        ChatHeader,
        Loading,
        Message,
        MessageInput,
    },
    data() {
        return {
            atBottom: true,
        };
    },
    computed: {
        messages() {
            return this.$store.state.chat.messages;
        },
        isNewestLoaded() {
            return this.$store.state.chat.isNewestLoaded;
        },
        loading() {
            return this.$store.state.chat.loading;
        },
    },
    mounted() {
        this.$store.dispatch('initChat');
    },
    methods: {
        loadTopMessages() {
            this.$store.dispatch('loadTopMessages', this.$store.getters.topMessage);
        },
        loadBottomMessages() {
            this.$data.atBottom = true;
            this.$store.dispatch('loadBottomMessages', this.$store.getters.bottomMessage);
        },
        leave() {
            this.$data.atBottom = false;
        },
        sendMessage(message: string) {
            this.$store.dispatch('sendMessage', message);
        },
        sendSticker(stickerPath: string) {
            this.$store.dispatch('sendSticker', stickerPath);
        },
        async anchorToMessage(id: string) {
            const messageBoxElm = this.$refs.messages as Element;
            const targetElm = this.$refs[`message-${id}`] as Vue[];
            if (targetElm && targetElm[0]) {
                messageBoxElm.scrollTo(
                    0,
                    (targetElm[0].$el as HTMLElement).offsetTop - messageBoxElm.clientHeight / 2
                );

                // targetEle is Message Component
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (targetElm[0] as any).highlight();
            } else {
                await this.$store.dispatch('queryMessageRange', id);
                this.anchorToMessage(id);
            }
        },
    },
});
</script>
