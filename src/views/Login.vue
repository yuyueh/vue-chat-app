<template>
    <div class="container flex h-screen items-center">
        <div class="text-center font-bold w-1/3 px-3 py-4 mx-auto rounded">
            <h3 class="text-xl">Chat App</h3>
            <button
                class="bg-blue-800 text-white py-2 px-4 rounded border block mx-auto w-full"
                @click="login()"
            >
                <i class="fab fa-google"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        login() {
            this.$store.dispatch('loginAsync');
        },
    },
};
</script>
