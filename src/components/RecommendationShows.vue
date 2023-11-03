<script setup>
import RatingStars from './RatingStars.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Navigation, FreeMode } from 'swiper/modules'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const recommendedShows = ref([])
const hasRecommendation = ref(false)
const props = defineProps({
  showId: Number,
  showType: String
})
function pushRoute(type, id) {
  router.push({ path: `/${type}/${id}` })
  setTimeout(() => {
    window.location.reload()
  }, 100)
}
onMounted(() => {
  if (route.name == 'tvDetails') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${props.showId}/recommendations?language=en-US&page=1`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }

    axios
      .request(options)
      .then(function (response) {
        recommendedShows.value = response.data.results
        if (recommendedShows.value.length >= 1) hasRecommendation.value = true
      })
      .catch(function (error) {
        console.error(error)
      })
  } else if (route.name == 'movieDetails') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${props.showId}/recommendations?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }

    axios
      .request(options)
      .then(function (response) {
        recommendedShows.value = response.data.results
        if (recommendedShows.value.length == 0) {
          hasRecommendation.value = false
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
})
</script>
<template>
  <div>
    <div class="pl-[2rem] hidden lg:block" v-if="hasRecommendation">
      <div class="py-4">
        <span class="pl-[1rem] lg:text-3xl text-2xl text-white" v-motion-fade-visible-once
          >More Like This</span
        >
      </div>
      <swiper
        :navigation="true"
        :modules="[Navigation, FreeMode]"
        :slides-per-view="5"
        :freeMode="true"
        class="mySwiper"
      >
        <swiper-slide v-for="recommended in recommendedShows" :key="recommended.id" class="px-3">
          <div
            class="flex flex-col gap-2 group hover:cursor-pointer"
            @click="pushRoute(recommended.media_type, recommended.id)"
          >
            <img
              v-if="!recommendedShows.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${recommended.poster_path}`"
              class="w-full h-full transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
              alt="recommended poster image"
            />
            <div v-else class="flex justify-center items-center h-[414px] bg-[#202124]">
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
            <span class="truncate lg:block hidden text-lg"> {{ recommended.name }}</span>
            <div class="flex gap-2">
              <RatingStars :rating="recommended.vote_average" />
              <span class="text-gray-500 pt-1">{{ recommended.vote_average / 2 }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div>
      <div class="block lg:hidden" v-if="hasRecommendation">
        <div class="py-4">
          <span class="pl-[1rem] lg:text-3xl text-2xl text-white" v-motion-fade-visible-once
            >More Like This</span
          >
        </div>
        <swiper :modules="[FreeMode]" :slides-per-view="3" :freeMode="true" class="mySwiper">
          <swiper-slide v-for="recommended in recommendedShows" :key="recommended.id" class="px-3">
            <div
              class="flex flex-col gap-2 group hover:cursor-pointer"
              @click="pushRoute(recommended.media_type, recommended.id)"
            >
              <img
                v-if="!recommendedShows.poster_path"
                :src="`https://image.tmdb.org/t/p/w500${recommended.poster_path}`"
                class=" transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
                alt="image for the not found poster for the recommended"
              />
              <div v-else class="flex justify-center items-center h-[414px] bg-[#202124]">
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
