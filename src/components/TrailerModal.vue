<script setup>
// Initialization for ES Users
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { Modal, Ripple, initTE } from 'tw-elements'
onMounted(() => {
  initTE({ Modal, Ripple })
})
const prop = defineProps({
  showId: String,
  showType: String
})
const trailer = ref('')
if (prop.showType == 'movie') {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${prop.showId}/videos?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then((res) => (trailer.value = `https://www.youtube.com/embed/${res.data.results[0].key}`))

    .catch(function (error) {
      console.error(error)
    })
} else if (prop.showType == 'tv') {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${prop.showId}/videos?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then((res) => (trailer.value = `https://www.youtube.com/embed/${res.data.results[0].key}`))

    .catch(function (error) {
      console.error(error)
    })
}
const videoPlayer = ref(null)
function test() {
  videoPlayer.value.pause()
}
</script>
<template>
  <div>
    <div class="space-y-2">
      <!-- Button trigger vertically centered modal-->
      <button
        type="button"
        class="lg:inline-flex hidden items-center gap-2 bg-[#2A2B2C] hover:opacity-70 rounded px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
        data-te-toggle="modal"
        data-te-target="#exampleModalCenter"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img src="../assets/icons/playIcon.svg" class="w-6" alt="" />

        Watch trailer
      </button>
      <button class="lg:hidden">
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
    </div>

    <!--Verically centered modal-->
    <div
      data-te-modal-init
      class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-black"
      id="exampleModalCenter"
      tabindex="-1"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog"
    >
      <div
        data-te-modal-dialog-ref
        class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center justify-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
      >
        <div
          class="pointer-events-auto relative flex w-[1700px] flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-2xl outline-none dark:bg-transparent pb-12"
        >
          <div class="flex pb-6 justify-end rounded-t-md">
            <button
              type="button"
              class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
              @click="test"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!--Modal body-->
          <div class="aspect-w-24">
            <iframe
              :src="trailer"
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture; "
              allowfullscreen
              ref="videoPlayer"
            ></iframe>
          </div>
          <!--Modal footer-->
        </div>
      </div>
    </div>
  </div>
</template>
