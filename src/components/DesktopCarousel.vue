<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import RatingStars from './RatingStars.vue'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Navigation, FreeMode } from 'swiper/modules'

defineProps({
  show: Array
})
console.log()
</script>
<template>
  <!-- you have to make a loading for the images in the carousel -->
  <div class="pl-[2rem]">
    <div>
      <swiper
        :navigation="true"
        :modules="[Navigation, FreeMode]"
        :slides-per-view="5"
        :freeMode="true"
        :space-between="30"
        class="mySwiper"
      >
        <swiper-slide v-for="movie in show" :key="movie.id">
          <div class="flex flex-col gap-2">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" />
            <span class="truncate">{{ movie.title }} {{ movie.name }}</span>
            <div class="flex gap-4">
              <RatingStars :rating="movie.vote_average" />
              <span class="text-gray-500 pt-1">{{ movie.vote_average / 2 }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style>
.swiper-button-prev {
  color: white;
}
.swiper-button-next {
  color: white;
}
</style>
