import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
export const useTrending = defineStore('trending', () => {
  const items = ref([])
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then((res) => items.value.push(...res.data.results))

    .catch((err) => console.log(err))

  return { items }
})
