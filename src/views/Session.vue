<template>
    <div class="flex flex-col space-y-2 w-full h-screen justify-center">
        <h1 class="text-3xl font-medium text-center text-white">Session</h1>
        <div class="flex flex-col justify-end w-11/12 h-5/6 mx-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div id="messages" class="w-full h-full overflow-y-scroll">
                <div  class="flex flex-col justify-end w-full p-2">
                    <message
                            name="test-client"
                            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat arcu quam."
                    ></message>
                    <message
                            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat arcu quam."
                            sender
                    ></message>

                </div>
            </div>
            <div class="flex flex-row bg-gray-100 focus-within:bg-white transition-colors ease-in-out delay-75 rounded-lg shadow-lg">
                <input type="text" class="w-full  py-2 px-1.5 focus:outline-none bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 text-blue-500 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/message";

export default {
    name: "Session",
    components: {Message,},
    data: () => {
        return {
            sessionId: ''
        }
    },
    mounted() {
        this.sessionId = this.$route.params.id
        this.$socket.client.emit("joinSession", this.sessionId)
    }
}
</script>

<style scoped>
    #messages::-webkit-scrollbar {
        display: none;
    }
    #messages {
        -ms-overflow-style: none;
        scrollbar-width: none
    }
</style>