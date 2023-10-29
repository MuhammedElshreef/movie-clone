<script setup>
import { ref } from 'vue'
const activeButton = ref(1)
defineProps({
  type: String
})
</script>
<template>
  <div class="flex justify-center lg:gap-16 gap-4">
    <button
      class="lg:text-lg text-sm hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]': activeButton == 1
      }"
      @click="(activeButton = 1), $emit('activeTap', 'KnownForPage')"
    >
      KNOWN FOR
    </button>
    <!-- <button
      class="lg:text-lg text-sm hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]': activeButton == 2
      }"
      @click="(activeButton = 2), $emit('activeTap', 'CreditsPage')"
    >
      CREDITS
    </button> -->
    <button
      class="lg:text-lg text-sm hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]': activeButton == 3
      }"
      @click="(activeButton = 3), $emit('activeTap', 'PersonPhotos')"
    >
      PHOTOS
    </button>
  </div>
</template>
