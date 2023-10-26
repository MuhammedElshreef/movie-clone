<script setup>
import TrailerModal from './TrailerModal.vue'
import RatingStars from './RatingStars.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  show: Array
})
const trailerLink = ref('')
const isModalOpen = ref(false)
function toggleModal(e) {
  isModalOpen.value = e
}
const haveTrailer = ref(false)
onMounted(() => {
  if (props.show.media_type == 'movie' || route.path == '/movie') {
    console.log(props.show.id)
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
        if (res.data.results[0]) {
          ;(haveTrailer.value = true),
            (trailerLink.value = `https://www.youtube.com/embed/${res.data.results[1].key}`)
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
            (trailerLink.value = `https://www.youtube.com/embed/${res.data.results[1].key}`)
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
})
</script>

<template>
  <div class="lg:flex hidden">
    <div class="bg-black text-white flex flex-col justify-center px-12 w-1/2">
      <div class="absolute w-[40%] z-[1100] flex flex-col gap-4" v-motion-fade>
        <p class="text-4xl">{{ props.show.title }} {{ props.show.name }}</p>
        <div class="flex gap-6">
          <RatingStars :rating="props.show.vote_average" />
          <span class="text-gray-500 pt-1">{{ props.show.vote_count }} reviews</span>
          <span class="text-gray-500 pt-1">{{ props.show.release_date }}</span>
          <span class="text-gray-500 pt-1">{{ props.show.original_language }} </span>
        </div>
        <p class="text-base">{{ props.show.overview }}</p>
        <!-- <TrailerModal :showId="props.show.id" :showType="props.show.media_type" /> -->
        <button
          v-if="haveTrailer"
          type="button"
          class="lg:inline-flex hidden items-center gap-2 bg-[#2A2B2C] hover:opacity-70 rounded px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out w-52"
          @click="isModalOpen = true"
        >
          <img src="../assets/icons/playIcon.svg" class="w-6" alt="" />

          Watch trailer
        </button>
      </div>
    </div>
    <div class="w-[73%] relative hidden lg:block" v-motion-fade>
      <div
        class="absolute w-full h-full"
        style="background-image: linear-gradient(90deg, #000 0, transparent 50%, transparent)"
      ></div>
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.show.backdrop_path}`"
        class="w-full h-full"
        alt=""
      />
    </div>
    <TrailerModal
      :isModalOpen="isModalOpen"
      :link="trailerLink"
      v-if="isModalOpen == true"
      @close-modal="toggleModal"
    />
  </div>
</template>
