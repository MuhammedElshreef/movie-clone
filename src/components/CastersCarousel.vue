<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Navigation, FreeMode } from 'swiper/modules'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
const route = useRoute()
const router = useRouter()
const hasCasters = ref(false)
const casters = ref([])
function getDetails(id) {
  router.push({ path: `/person/${id}` })
}
function getData(id) {
  if (route.name == 'tvDetails') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
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
        if (casters.value.length >= 1) hasCasters.value = true
      })
      .catch(function (error) {
        console.error(error)
      })
  } else if (route.name == 'movieDetails') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
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
        if (casters.value !== undefined) {
          hasCasters.value = true
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}
onMounted(() => {
  getData(route.params.id)
})
</script>
<template>
  <div>
    <div class="pl-[2rem] hidden lg:block" v-if="hasCasters == true">
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
          <div
            class="flex flex-col gap-2 group hover:cursor-pointer"
            @click="getDetails(caster.id)"
          >
            <img
              v-if="caster.profile_path !== null"
              :src="`https://image.tmdb.org/t/p/w500${caster.profile_path}`"
              class="transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
              alt=""
            />
            <div v-else class="flex justify-center items-center h-[255.64px] bg-[#202124]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#cbd5e1"
                class="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
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
            <div
              class="flex flex-col gap-2 group hover:cursor-pointer"
              @click="getDetails(caster.id)"
            >
              <img
                v-if="caster.profile_path !== null"
                :src="`https://image.tmdb.org/t/p/w500${caster.profile_path}`"
                class="transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
                alt=""
              />
              <div v-else class="flex justify-center items-center h-[151.5px] bg-[#202124]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#cbd5e1"
                  class="w-14 h-14"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
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
