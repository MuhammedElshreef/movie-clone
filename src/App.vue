<script setup>
import NavBar from './components/NavBar.vue'
// import { useStoreMovie } from './stores/storeMovie'
// const movies = useStoreMovie()
</script>
<template>
  <div class="bg-[#141414] ">
    <NavBar class=" " />
    <div class="min-h-screen">
      <router-view></router-view>
    </div>
  </div>
</template>
