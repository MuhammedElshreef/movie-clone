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
      <img
        :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
        class="transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
        alt="poster image"
      />
      <span class="truncate lg:block hidden">{{ show.title }} {{ show.name }}</span>
      <div class="lg:flex gap-4 hidden">
        <RatingStars :rating="show.vote_average" />
        <span class="text-gray-500 pt-1">{{ show.vote_average / 2 }}</span>
      </div>
    </div>
  </div>
</template>
