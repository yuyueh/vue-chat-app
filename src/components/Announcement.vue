<template>
    <div class="relative bg-purple-400 font-bold py-3 text-center">
        <span class="cursor-pointer" @click="onClick('c5CUsObiM9Wyjy493lLu')">
            最近掏寶辦1111慶祝，有推薦的店家嗎?
        </span>
        <span class="absolute text-white right-0 px-3 cursor-pointer">
            <i class="fas fa-sort-down"></i>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Announcement',
    methods: {
        onClick(id: string) {
            this.$emit('anchorTo', id);
        },
    },
});
</script>
