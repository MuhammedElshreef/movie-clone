<script setup>
import NavBar from './components/NavBar.vue'
</script>
<template>
  <div class="bg-[#141414]">
    <NavBar />
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
