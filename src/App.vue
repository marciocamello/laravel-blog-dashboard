<template>
  <div id="app" class="h-screen bg-light">
    <Navigation />
    <div class="container">
        <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue"

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
.h-screen {
  height: 100vh;
}
</style>
