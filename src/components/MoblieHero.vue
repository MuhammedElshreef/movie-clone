<script setup>
import TrailerModal from './TrailerModal.vue'
import RatingStars from './RatingStars.vue'

const props = defineProps({
  show: Array
})
</script>
<template>
  <div class="flex flex-col">
    <div class="relative">
      <div
        class="absolute w-full h-full"
        style="background-image: linear-gradient(0deg, #000 0, transparent 50%, transparent)"
      ></div>
      <TrailerModal
        :showId="props.show.id"
        :showType="props.show.media_type"
        class="absolute top-1/3 left-[41%]"
      />

      <img
        :src="`https://image.tmdb.org/t/p/w500${props.show.backdrop_path}`"
        class="w-full h-full"
        alt=""
      />
    </div>
    <div class="bg-black text-white flex flex-col justify-center">
      <div class="container flex flex-col gap-2 py-6">
        <p class="text-4xl">{{ props.show.title }} {{ props.show.name }}</p>
        <div class="flex gap-2">
          <RatingStars :rating="props.show.vote_average" />
          <span class="text-gray-500 pt-1">{{ props.show.vote_count }} reviews</span>
        </div>
        <div class="flex gap-4">
          <span class="text-gray-500 pt-0.5"
            >{{ props.show.release_date }} {{ props.show.first_air_date }}</span
          >
          <span class="text-gray-500">{{ props.show.original_language }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
