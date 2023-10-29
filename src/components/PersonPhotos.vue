<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const photos = ref([])
const route = useRoute()
function getData(id) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/person/${id}/images`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then(function (response) {
      photos.value = response.data.profiles
    })
    .catch(function (error) {
      console.error(error)
    })
}
onMounted(() => {
  getData(route.params.id)
})
</script>
<template>
  <div class="container grid lg:grid-cols-5 gap-2" v-motion-fade>
    <div v-for="(photo, index) in photos" :key="index">
      <div>
        <img :src="`https://image.tmdb.org/t/p/w500${photo.file_path}`" alt="" loading="lazy" />
      </div>
    </div>
  </div>
</template>
