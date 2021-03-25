<template>
  <div id="app">
      <transition name="fade" mode="out-in">
          <router-view/>
      </transition>
  </div>
</template>

<style>
    body {
        @apply bg-gradient-to-br from-red-400 to-pink-400
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease-in-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
