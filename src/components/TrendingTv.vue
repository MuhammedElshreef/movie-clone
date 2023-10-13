<script setup>
import RatingStars from './RatingStars.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Navigation, FreeMode } from 'swiper/modules'
import { useTrendingTv } from '../stores/trendingTv'
const trendingTv = useTrendingTv()
</script>
<template>
  <div class="container">
    <h2 class="py-8 text-3xl text-white">Trending Tv</h2>
    <div>
      <swiper
        :navigation="true"
        :modules="[Navigation, FreeMode]"
        :slides-per-view="5"
        :freeMode="true"
        :space-between="30"
        class="mySwiper"
      >
        <swiper-slide v-for="show in trendingTv.trending" :key="show.id">
          <div class="flex flex-col gap-2">
            <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" alt="" />
            <span class="truncate">{{ show.title }} {{ show.name }}</span>
            <div class="flex gap-4">
              <RatingStars :rating="show.vote_average" />
              <span class="text-gray-500 pt-1">{{ show.vote_average }}</span>
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
