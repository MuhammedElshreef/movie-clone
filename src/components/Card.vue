<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import RatingStars from './RatingStars.vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
defineProps({
  show: Object
})

function details(type, id) {
  if (route.path == '/') {
    router.push({ path: `/${type}/${id}` })
  } else if (route.path == '/movie') {
    router.push({ path: `/movie/${id}` })
  } else if (route.path == '/tv') {
    router.push({ path: `/tv/${id}` })
  }
}
</script>
<template>
  <div>
    <div
      class="flex flex-col gap-2 group hover:cursor-pointer"
      @click="details(show.media_type, show.id)"
    >
      <div class="lg:w-[257px] lg:h-[385px] bg-[#202124]">
        <img
          v-if="show.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
          class="object-cover transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-105"
          alt="poster image"
        />
        <div v-else class="flex justify-center items-center lg:w-[257px] lg:h-[385px] bg-[#202124]">
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
      <span class="hidden truncate lg:block">{{ show.title }} {{ show.name }}</span>
      <div class="hidden gap-4 lg:flex">
        <RatingStars :rating="show.vote_average" />
        <span class="pt-1 text-gray-500">{{ show.vote_average / 2 }}</span>
      </div>
    </div>
  </div>
</template>
