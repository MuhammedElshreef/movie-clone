<script setup>
import TrailerModal from './TrailerModal.vue'
import RatingStars from './RatingStars.vue'

const props = defineProps({
  show: Array
})
</script>

<template>
  <div class="lg:flex hidden">
    <div class="bg-black text-white flex flex-col justify-center px-12 w-1/2">
      <div class="absolute w-[40%] z-[1100] flex flex-col gap-4" v-motion-fade>
        <p class="text-4xl">{{ props.show.title }} {{ props.show.name }}</p>
        <div class="flex gap-6">
          <RatingStars :rating="props.show.vote_average" />
          <span class="text-gray-500 pt-1">{{ props.show.vote_count }} reviews</span>
          <span class="text-gray-500 pt-1">{{ props.show.release_date }}</span>
          <span class="text-gray-500 pt-1">{{ props.show.original_language }} </span>
        </div>
        <p class="text-base">{{ props.show.overview }}</p>
        <TrailerModal :showId="props.show.id" :showType="props.show.media_type" />
      </div>
    </div>
    <div class="w-[73%] relative hidden lg:block" v-motion-fade>
      <div
        class="absolute w-full h-full"
        style="background-image: linear-gradient(90deg, #000 0, transparent 50%, transparent)"
      ></div>
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.show.backdrop_path}`"
        class="w-full h-full"
        alt=""
      />
    </div>
  </div>
</template>
