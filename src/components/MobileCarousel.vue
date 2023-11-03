<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'
import Card from './Card.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function exploreMore(type, category) {
  router.push({ path: `/${type}/${category}` })
}
const props = defineProps({
  show: Array,
  category: String,
  type: String
})
</script>
<template>
  <div class="">
    <div>
      <swiper :modules="[FreeMode]" :slides-per-view="3" :freeMode="true" class="mySwiper">
        <swiper-slide v-for="movie in show" :key="movie.id" class="px-3">
          <Card :show="movie" />
        </swiper-slide>
        <swiper-slide>
          <div
            class="flex items-center justify-center bg-[#202124] h-[151px] w-[106px] transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
            @click="exploreMore(props.type, props.category)"
          >
            <span class="text-white text-sm">Explore More</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
