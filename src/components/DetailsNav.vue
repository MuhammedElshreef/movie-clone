<script setup>
import { ref } from 'vue'
const activeButton = ref(1)
</script>
<template>
  <div class="lg:flex justify-center gap-16 hidden">
    <button
      class="text-lg hover:text-white"
      :class="{ 'text-white underline text-2xl underline-offset-[12px]': activeButton == 1 }"
      @click="activeButton = 1"
    >
      OVERVIEW
    </button>
    <button
      class="text-lg hover:text-white"
      :class="{ 'text-white underline text-2xl underline-offset-[12px]': activeButton == 2 }"
      @click="activeButton = 2"
    >
      EPISODES
    </button>
    <button
      class="text-lg hover:text-white"
      :class="{ 'text-white underline text-2xl underline-offset-[12px]': activeButton == 3 }"
      @click="activeButton = 3"
    >
      VIDEOS
    </button>
    <button
      class="text-lg hover:text-white"
      :class="{ 'text-white underline text-2xl underline-offset-[12px]': activeButton == 4 }"
      @click="activeButton = 4"
    >
      PHOTOS
    </button>
  </div>
</template>
