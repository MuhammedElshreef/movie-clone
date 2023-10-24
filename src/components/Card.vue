<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import RatingStars from './RatingStars.vue'
defineProps({
  show: Object
})
</script>
<template>
  <div>
    <div class="flex flex-col gap-2">
      <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" alt="" />
      <span class="truncate lg:block hidden">{{ show.title }} {{ show.name }}</span>
      <div class="lg:flex gap-4 hidden">
        <RatingStars :rating="show.vote_average" />
        <span class="text-gray-500 pt-1">{{ show.vote_average / 2 }}</span>
      </div>
    </div>
  </div>
</template>
