<template>
    <div class="flex justify-between">
        <div>
            <div class="p-6 font-bold cursor-pointer inline-block cursor">首頁</div>
            <div class="p-6 font-bold cursor-pointer inline-block cursor">本日話題</div>
            <div class="p-6 font-bold inline-block border-b-4 border-blue-800">偷偷說</div>
        </div>
        <div class="p-6 bg-blue-800 border-b-4 border-blue-800 text-white">
            {{ currentUser.displayName }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ChatHeader',
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
    },
});
</script>
