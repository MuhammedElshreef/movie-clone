<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Navigation, FreeMode } from 'swiper/modules'
import Card from './Card.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  show: Array,
  category: String,
  type: String
})
function exploreMore(type, category) {
  router.push({ path: `/${type}/${category}` })
}
</script>
<template>
  <!-- you have to make a loading for the images in the carousel -->
  <div class="px-[2rem]">
    <div>
      <swiper
        :navigation="true"
        :modules="[Navigation, FreeMode]"
        :slides-per-view="5"
        :freeMode="true"
        :space-between="10"
        class="mySwiper"
      >
        <swiper-slide v-for="movie in show" :key="movie.id">
          <Card :show="movie" />
        </swiper-slide>
        <swiper-slide>
          <div
            class="flex items-center justify-center bg-[#202124] h-[387px] transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
            @click="exploreMore(props.type, props.category)"
          >
            <span class="text-2xl text-white">Explore More</span>
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
