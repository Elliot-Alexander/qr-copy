<template>
    <div class="flex flex-col space-y-2 w-full h-screen justify-center">
        <h1 class="text-4xl font-title text-center text-white">Scan</h1>
        <div class="flex flex-col w-11/12 max-w-lg mx-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg font-body">
            <div class="flex flex-col">
                <div class="w-full h-3/4 rounded-t-lg overflow-hidden">
                    <qrcode-stream
                            @decode="onDecode"
                            @init="onInit"
                    >
                        <div class="loading-indicator" v-if="loading">
                            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
                                <defs>
                                    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                                        <stop stop-color="#3B82F6" stop-opacity="0" offset="0%"/>
                                        <stop stop-color="#3B82F6" stop-opacity=".631" offset="63.146%"/>
                                        <stop stop-color="#3B82F6" offset="100%"/>
                                    </linearGradient>
                                </defs>
                                <g fill="none" fill-rule="evenodd">
                                    <g transform="translate(1 1)">
                                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                                            <animateTransform
                                                    attributeName="transform"
                                                    type="rotate"
                                                    from="0 18 18"
                                                    to="360 18 18"
                                                    dur="0.9s"
                                                    repeatCount="indefinite" />
                                        </path>
                                        <circle fill="#fff" cx="36" cy="18" r="1">
                                            <animateTransform
                                                    attributeName="transform"
                                                    type="rotate"
                                                    from="0 18 18"
                                                    to="360 18 18"
                                                    dur="0.9s"
                                                    repeatCount="indefinite" />
                                        </circle>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </qrcode-stream>
                </div>
                <div class="w-full h-1/4 bg-gray-100 rounded-b-lg shadow-lg p-4 overflow-hidden" v-if="!loading">
<!--                    Error-->
                    <div class="flex flex-col items-center mx-auto space-x-1 transition-opacity text-red-600 justify-center" v-if="error !== ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        <p class="">Something went wrong.</p>
                    </div>
<!--                    Loader-->
                    <div class="flex flex-col h-full items-center mx-auto space-x-1 text-blue-500 justify-center" v-if="qrLoader">
                        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                                    <stop stop-color="#3B82F6" stop-opacity="0" offset="0%"/>
                                    <stop stop-color="#3B82F6" stop-opacity=".631" offset="63.146%"/>
                                    <stop stop-color="#3B82F6" offset="100%"/>
                                </linearGradient>
                            </defs>
                            <g fill="none" fill-rule="evenodd">
                                <g transform="translate(1 1)">
                                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                                        <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 18 18"
                                                to="360 18 18"
                                                dur="0.9s"
                                                repeatCount="indefinite" />
                                    </path>
                                    <circle fill="#fff" cx="36" cy="18" r="1">
                                        <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 18 18"
                                                to="360 18 18"
                                                dur="0.9s"
                                                repeatCount="indefinite" />
                                    </circle>
                                </g>
                            </g>
                        </svg>
                    </div>
<!--                    Found-->
                    <div class="flex flex-col h-full items-center mx-auto space-x-1 text-green-500 justify-center" v-if="result !== ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'
import axios from "axios";

export default {
    name: "Scan",
    components: {QrcodeStream},
    data: () => {
        return {
            result: '',
            error: '',
            loading: false,
            qrLoader: false,
        }
    },
    sockets: {
        // clientJoined() {
        //     console.log("joined room")
        // }
    },
    methods: {
        onDecode: function(result) {
            this.qrLoader = false
            this.result = JSON.parse(result)
            axios.get(`https://api.connectr.xyz/validate/session/${this.result.sessionId}`)
                .then(res => {
                    if(res.status === 200) {
                        this.$router.push(`/session/${result}`)
                    } else {
                        this.error = "ERROR: Invalid QR code"
                        console.log(res)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            console.log(result)
        },
        async onInit (promise) {
            this.loading = true
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permission"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                }
            } finally {
                this.loading = false
                this.qrLoader = true
            }
        }
    }
}
</script>

<style scoped>

</style>