<template>
    <div
        :class="{
            'text-left': !message.myself,
            'text-right': message.myself,
            [`border-${message.color}`]: true,
        }"
        class="container mx-auto p-3"
    >
        <div
            class="pb-2"
            :class="{
                [`text-${message.color}`]: true,
            }"
        >
            {{ message.displayName }}
        </div>
        <p
            ref="text"
            v-if="message.type === ChatEnum.Text"
            class="inline-block border rounded-b-lg p-3 transition-colors duration-1000 ease-in-out"
            :class="{
                [`border-${message.color}`]: true,
                'rounded-tl-lg': message.myself,
                'rounded-tr-lg': !message.myself,
            }"
        >
            {{ message.text }}
        </p>
        <img
            v-else-if="message.type === ChatEnum.Sticker"
            class="w-200p h-200p py-5 inline-block"
            :src="'/images/sticker/' + message.imagePath"
            alt
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChatEnum from '@/models/ChatTypeEnum';

export default Vue.extend({
    name: 'Message',
    props: ['message'],
    data() {
        return {
            ChatEnum,
        };
    },
    methods: {
        highlight() {
            const elm = this.$refs.text as HTMLElement;
            elm.classList.add('bg-yellow-300');
            setTimeout(() => {
                elm.classList.remove('bg-yellow-300');
            }, 3000);
        },
    },
});
</script>
