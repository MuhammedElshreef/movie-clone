<script setup>
import axios from 'axios'
import RatingStars from '../components/RatingStars.vue'

import { useRoute } from 'vue-router'
import { watch, onMounted, ref, onUnmounted } from 'vue'
const route = useRoute()
const shows = ref([])
const totalPages = ref()
const currentPage = ref(1)
const isLoading = ref()
onMounted(() => {
  getData(route.query.q, currentPage.value)
})

const timeout = ref(null)
const debounceFn = (fn, time) => {
  if (timeout.value) clearTimeout(timeout.value)
  timeout.value = setTimeout(fn, time)
}

function getData(id, page) {
  debounceFn(() => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/multi?query=${id}&include_adult=false&language=en-US&page=${page}`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
      }
    }
    axios
      .request(options)
      .then((res) => {
        if (currentPage.value == 1) {
          ;(shows.value = res.data.results), (totalPages.value = res.data.total_pages)
          isLoading.value = false
        } else if (currentPage.value >= 1) {
          shows.value.push(...res.data.results)
          isLoading.value = false
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }, 500)
}
watch(route, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  currentPage.value = 1
  getData(route.query.q, currentPage.value)
  isLoading.value = false
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    setTimeout(() => {
      const searchListEle = document.getElementById('search-list')
      if (!searchListEle) return
      if (window.scrollY.toFixed() >= searchListEle.clientHeight - 900) {
        if (totalPages.value != currentPage.value) {
          isLoading.value = true
          currentPage.value += 1
          getData(route.query.q, currentPage.value)
        }
      }
    }, 2000)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})
</script>
<template>
  <div
    class="min-h-screen lg:pl-[8rem] pt-[8rem] lg:text-4xl text-2xl text-gray-200"
    id="search-list"
  >
    <div class="flex flex-col lg:pr-[4rem] px-2">
      <p class="">Results For: {{ route.query.q }}</p>

      <div class="grid grid-cols-3 gap-2 pt-4 pb-16 lg:grid-cols-5 lg:gap-4 lg:py-6">
        <router-link
          class="flex flex-col gap-2 group hover:cursor-pointer"
          v-for="show in shows"
          :key="show.id"
          :to="`/${show.media_type}/${show.id}`"
          v-motion-fade
        >
          <div
            v-if="
              (show.media_type == 'movie' && show.poster_path !== null) ||
              (show.media_type == 'tv' && show.poster_path !== null)
            "
            class="lg:w-[248px] lg:h-[372px]"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
              class="lg:w-[248px] lg:h-[372px] transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300 object-cover"
              alt=" posters for the found shows"
            />
          </div>
          <div v-else-if="show.media_type == 'person' && show.profile_path !== null">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${show.profile_path}`"
              class="lg:w-[248px] lg:h-[372px] transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300 object-cover"
              alt="profile photo for the found person"
            />
          </div>
          <div
            v-else
            class="flex justify-center items-center lg:h-[372px] h-[171px] bg-[#202124] transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
          >
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

          <span class="hidden text-xl truncate lg:block">{{ show.title }} {{ show.name }}</span>
          <div v-if="show.media_type != 'person'" class="hidden gap-4 lg:flex">
            <RatingStars :rating="show.vote_average" />
            <span class="pt-1 text-lg text-gray-500">{{ show.vote_average / 2 }}</span>
          </div>
        </router-link>
      </div>
      <div role="status" class="flex items-center justify-center h-36" v-if="isLoading">
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
