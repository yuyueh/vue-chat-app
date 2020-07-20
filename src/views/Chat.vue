<template>
    <div class="flex flex-col h-screen">
        <ChatHeader />
        <div class="relative bg-purple-400 font-bold py-3 text-center cursor-pointer">
            最近掏寶辦1111慶祝，有推薦的店家嗎?
            <span class="absolute text-white right-0 px-3">
                <i class="fas fa-sort-down"></i>
            </span>
        </div>
        <div
            class="flex-grow overflow-y-auto"
            v-scroll-keep="always"
            @scroll-top-reach="loadMessagesBefore()"
            @scroll-bottom-reach="loadMessagesAfter()"
            @leave-from-bottom="leave()"
        >
            <div
                v-for="message in messages"
                :key="message.id"
                :class="{
                    'text-left': !message.myself,
                    'text-right': message.myself,
                    'border-red-600': !message.myself,
                    'border-green-600': message.myself,
                }"
                class="container mx-auto p-3"
            >
                <div
                    class="pb-2"
                    :class="{
                        'text-green-600': message.myself,
                        'text-red-600': !message.myself,
                    }"
                >
                    {{ message.displayName }}
                </div>
                <p
                    v-if="message.type === ChatEnum.Text"
                    class="inline-block border rounded-b-lg p-3"
                    :class="{
                        'border-green-600': message.myself,
                        'border-red-600': !message.myself,
                        'rounded-tl-lg': message.myself,
                        'rounded-tr-lg': !message.myself,
                    }"
                >
                    {{ message.text }}
                </p>
                <img
                    v-else-if="message.type === ChatEnum.Sticker"
                    class="w-1/3 py-5 px-24 cursor-pointer inline-block"
                    src="../assets/images/sticker1.png"
                    alt
                />
            </div>
        </div>
        <div class="border-t-4 border-gray-200">
            <div class="flex container mx-auto">
                <div class="p-5 cursor-pointer">
                    <i class="far fa-images"></i>
                </div>
                <div class="p-5 cursor-pointer">
                    <i class="far fa-smile-beam"></i>
                </div>
                <div class="py-5 flex-grow">
                    <input
                        class="w-full border-2 border-black rounded"
                        type="text"
                        v-model="message"
                        @keyup.enter="sendMessage()"
                    />
                </div>
                <div class="p-5 cursor-pointer" @click="sendMessage()">
                    <i class="fas fa-location-arrow"></i>
                </div>
            </div>
        </div>
        <!-- <div class="flex flex-wrap overflow-y-auto">
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker1.png"
                alt=""
            />
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker2.png"
                alt=""
            />
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker3.png"
                alt=""
            />
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker4.png"
                alt=""
            />
    </div>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChatEnum from '@/models/ChatTypeEnum';
import ChatHeader from '../components/ChatHeader.vue';

export default Vue.extend({
    components: {
        ChatHeader,
    },
    data() {
        return {
            always: true,
            ChatEnum,
            message: '',
        };
    },
    computed: {
        messages() {
            return this.$store.state.chat.messages;
        },
    },
    mounted() {
        this.$store.dispatch('initChat');
    },
    methods: {
        loadMessagesBefore() {
            this.$store.dispatch('loadMessagesBefore', this.$store.getters.topMessage);
        },
        loadMessagesAfter() {
            this.$data.always = true;
            this.$store.dispatch('loadMessagesAfter', this.$store.getters.bottomMessage);
        },
        leave() {
            this.$data.always = false;
        },
        sendMessage() {
            this.$store.dispatch('sendMessage', this.$data.message);
            this.$data.message = '';
        },
    },
});
</script>
