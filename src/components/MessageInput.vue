<template>
    <div class="border-t-4 border-gray-200">
        <div class="flex container mx-auto">
            <div class="p-5 cursor-pointer">
                <i class="far fa-images"></i>
            </div>
            <div class="p-5 cursor-pointer" @click="toggleStickerList(!openStickerList)">
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
        <div class="flex flex-wrap overflow-y-auto max-h-200p" v-if="openStickerList">
            <img
                @click="sendSticker('sticker1.png')"
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="/images/sticker/sticker1.png"
                alt="sticker1"
            />
            <img
                @click="sendSticker('sticker2.png')"
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="/images/sticker/sticker2.png"
                alt="sticker2"
            />
            <img
                @click="sendSticker('sticker3.png')"
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="/images/sticker/sticker3.png"
                alt="sticker3"
            />
            <img
                @click="sendSticker('sticker4.png')"
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="/images/sticker/sticker4.png"
                alt="sticker4"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MessageInput',
    data() {
        return {
            message: '',
            openStickerList: false,
        };
    },
    methods: {
        sendMessage() {
            if (!this.$data.message) {
                return;
            }
            this.$emit('sendMessage', this.$data.message);
            this.$data.message = '';
        },
        sendSticker(stickerPath: string) {
            this.$emit('sendSticker', stickerPath);
            this.$data.openStickerList = false;
        },
        toggleStickerList(open: boolean) {
            this.$data.openStickerList = open;
        },
    },
});
</script>
