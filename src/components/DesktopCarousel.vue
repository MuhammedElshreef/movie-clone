<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Navigation, FreeMode } from 'swiper/modules'
import Card from './Card.vue'
defineProps({
  show: Array
})
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
          <Card :show="movie" />
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
