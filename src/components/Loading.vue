<template>
    <div class="absolute h-full w-full justify-center items-center flex bg-gray-500 bg-opacity-25">
        <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span class="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                <i class="fas fa-circle-notch fa-spin fa-5x"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Loading',
});
</script>
