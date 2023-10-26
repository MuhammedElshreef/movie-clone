<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Navigation, FreeMode } from 'swiper/modules'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
const route = useRoute()
const casters = ref([])
onMounted(() => {
  if (route.name == 'tvDetails') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${route.params.id}/credits?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }

    axios
      .request(options)
      .then(function (response) {
        casters.value = response.data.cast
      })
      .catch(function (error) {
        console.error(error)
      })
  } else if (route.name == 'movieDetails') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${route.params.id}/credits?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }

    axios
      .request(options)
      .then(function (response) {
        casters.value = response.data.cast
      })
      .catch(function (error) {
        console.error(error)
      })
  }
})
</script>
<template>
  <div>
    <div class="pl-[2rem] hidden lg:block">
      <div class="py-4">
        <span class="pl-[1rem] lg:text-3xl text-2xl text-white" v-motion-fade-visible-once
          >Cast</span
        >
      </div>
      <swiper
        :navigation="true"
        :modules="[Navigation, FreeMode]"
        :slides-per-view="7"
        :freeMode="true"
        class="mySwiper"
      >
        <swiper-slide v-for="caster in casters" :key="caster.id" class="px-3">
          <div class="flex flex-col gap-2 group hover:cursor-pointer">
            <img
              :src="`https://image.tmdb.org/t/p/w500${caster.profile_path}`"
              class="transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
              alt=""
            />
            <span class="truncate lg:block hidden text-lg"> {{ caster.name }}</span>
            <span class="text-gray-500">{{ caster.character }}</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div>
      <div class="block lg:hidden">
        <div class="py-4">
          <span class="pl-[1rem] lg:text-3xl text-2xl text-white" v-motion-fade-visible-once
            >Cast</span
          >
        </div>

        <swiper :modules="[FreeMode]" :slides-per-view="3" :freeMode="true" class="mySwiper">
          <swiper-slide v-for="caster in casters" :key="caster.id" class="px-3">
            <div class="flex flex-col gap-2 group hover:cursor-pointer">
              <img
                :src="`https://image.tmdb.org/t/p/w500${caster.profile_path}`"
                class="transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
                alt=""
              />
              <span class="truncate lg:block hidden text-lg"> {{ caster.name }}</span>
              <span class="text-gray-500">{{ caster.character }}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
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
