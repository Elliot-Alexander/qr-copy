<template>
    <div class="flex flex-col" v-if="sender">
        <p class="text-blue-500 text-sm ml-auto text-right">Me</p>
        <p class="ml-auto text-right">{{ message }}</p>
    </div>
    <div class="flex flex-col" v-else>
        <p class="text-blue-500 text-sm">{{ name }}</p>
        <p class="">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "message",
    props: {
        name: String,
        message: String,
        sender: Boolean
    }
}
</script>

<style scoped>

</style>