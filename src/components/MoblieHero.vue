<script setup>
import TrailerModal from './TrailerModal.vue'
import RatingStars from './RatingStars.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  show: {
    type: Object,
    required: true
  }
})
const trailerLink = ref('')
const isModalOpen = ref(false)
function toggleModal(e) {
  isModalOpen.value = e
}
const haveTrailer = ref(false)
onMounted(() => {
  if (props.show.media_type == 'movie' || route.path == '/movie') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${props.show.id}/videos?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }
    axios
      .request(options)
      .then((res) => {
        if (res.data.results[0] && res.data.results[1]) {
          haveTrailer.value = true
          trailerLink.value = `https://www.youtube.com/embed/${res.data.results[1].key}`
        }
      })

      .catch(function (error) {
        console.error(error)
      })
  } else if (props.show.media_type == 'tv' || route.path == '/tv') {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${props.show.id}/videos?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }
    axios
      .request(options)
      .then((res) => {
        if (res.data.results[0]) {
          ;(haveTrailer.value = true),
            (trailerLink.value = `https://www.youtube.com/embed/${res.data.results[0].key}`)
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
})
</script>
<template>
  <div class="flex flex-col">
    <div class="relative">
      <div
        class="absolute w-full h-full"
        style="background-image: linear-gradient(0deg, #000 0, transparent 50%, transparent)"
      ></div>
      <!-- <TrailerModal
        :showId="props.show.id"
        :showType="props.show.media_type"
        class=""
      /> -->
      <button
        class="lg:hidden absolute top-1/3 left-[41%]"
        @click="isModalOpen = true"
        v-if="haveTrailer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="0.5"
          stroke="white"
          class="w-16 h-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
      </button>
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.show.backdrop_path}`"
        class="w-full h-full"
        alt="show backdrop image "
        loading="lazy"
      />
    </div>
    <div class="flex flex-col justify-center text-white bg-black">
      <div class="container flex flex-col gap-2 py-6">
        <p class="text-4xl">{{ props.show.title }} {{ props.show.name }}</p>
        <div class="flex gap-2">
          <RatingStars :rating="props.show.vote_average" />
          <span class="pt-1 text-gray-500">{{ props.show.vote_count }} reviews</span>
        </div>
        <div class="flex gap-4">
          <span class="text-gray-500 pt-0.5"
            >{{ props.show.release_date }} {{ props.show.first_air_date }}</span
          >
          <span class="text-gray-500">{{ props.show.original_language }} </span>
        </div>
      </div>
    </div>
    <TrailerModal
      :isModalOpen="isModalOpen"
      :link="trailerLink"
      v-if="isModalOpen == true"
      @close-modal="toggleModal"
    />
  </div>
</template>
