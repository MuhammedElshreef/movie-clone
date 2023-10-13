import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
export const useCurrentlyAiring = defineStore('currentlyAiring', () => {
  const shows = ref([])
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then((res) => shows.value.push(...res.data.results))
    .catch((error) => console.log(error))
  return { shows }
})
