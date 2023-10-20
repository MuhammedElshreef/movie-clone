<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'

import {  FreeMode } from 'swiper/modules'

defineProps({
  show:Array
})
console.log()
</script>
<template>
  <div class="">
    <div>
      <swiper
        :modules="[FreeMode]"
        :slides-per-view="3"
        :freeMode="true"
        class="mySwiper "
      >
        <swiper-slide v-for="movie in show" :key="movie.id" class="px-3">
          <div >
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>