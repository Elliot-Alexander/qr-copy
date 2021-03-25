<template>
    <div class="flex flex-col space-y-2 w-full h-screen justify-center">
        <h1 class="text-3xl font-medium text-center text-white">Create</h1>
        <div class="flex flex-col w-5/6 mx-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-2">
            <qrcode-vue :value="JSON.stringify(value)" background="transparent" size="150" class="mx-auto"></qrcode-vue>
            <p class="text-center">Now open copycat.ml on your mobile device and scan the code above. Once the session is active this page will change</p>
            <h3 class="text-center text-xl font-medium">Session ID</h3>
            <p class="text-center">{{ value.sessionId }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Create",
    components: { QrcodeVue },
    data: () => {
        return {
            value: {
                sessionId: '',
                token: ''
            }
        }
    },
    sockets: {
        sessionDetails(details) {
            console.log(details)
            this.value.sessionId = details.sessionId
            this.value.token = details.token
        }
    },
    beforeCreate() {
        this.$socket.client.emit('getSetup')

    }
}

import QrcodeVue from 'qrcode.vue'
</script>

<style scoped>

</style>