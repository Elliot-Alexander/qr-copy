<template>
  <div class="flex flex-col space-y-2 w-full h-screen justify-center">
      <h1 class="text-4xl font-title text-center text-white">Connectr</h1>
      <div class="flex flex-col w-11/12 max-w-lg mx-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-2">
          <p class="text-center dark:text-white font-body">Real time, websocket based communication for your browser to your phone. Easily send text and files with just the scan of a QR between your devices. Select create to get started.</p>
          <div class="flex flex-row space-x-2 justify-center">
              <button class="w-1/3 bg-red-400 text-white font-medium rounded py-2 shadow-md" @click="$router.push('/scan')">
                  Scan
              </button>
              <button class="w-1/3 bg-blue-400 text-white font-medium rounded py-2 shadow-md" @click="$router.push('/create')">
                  Create
              </button>
          </div>
      </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>

</style>
