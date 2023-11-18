<script setup>
// Initialization for ES Users
// import { ref } from 'vue'
// import axios from 'axios'
import { onMounted, watch } from 'vue'
import { Modal, Ripple, initTE } from 'tw-elements'
onMounted(() => {
  initTE({ Modal, Ripple })
})

watch(
  () => props.isModalOpen,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto'
  }
)

const props = defineProps({
  link: String,
  isModalOpen: Boolean
  // showType: String
})
// const trailer = ref('')
// if (prop.showType == 'movie') {
//   const options = {
//     method: 'GET',
//     url: `https://api.themoviedb.org/3/movie/${prop.showId}/videos?language=en-US`,
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
//     }
//   }

//   axios
//     .request(options)
//     .then((res) => (trailer.value = `https://www.youtube.com/embed/${res.data.results[0].key}`))

//     .catch(function (error) {
//       console.error(error)
//     })
// } else if (prop.showType == 'tv') {
//   const options = {
//     method: 'GET',
//     url: `https://api.themoviedb.org/3/tv/${prop.showId}/videos?language=en-US`,
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
//     }
//   }

//   axios
//     .request(options)
//     .then((res) => (trailer.value = `https://www.youtube.com/embed/${res.data.results[0].key}`))

//     .catch(function (error) {
//       console.error(error)
//     })
// }
// const isModalOpen = ref(false)
</script>
<template>
  <div
    v-if="props.isModalOpen"
    @click.self="$emit('closeModal', false)"
    class="fixed left-0 top-0 bottom-0 min-h-screen w-full overflow-y-hidden bg-black z-[1100] flex justify-center"
  >
    <!--Verically centered modal-->
    <div
      data-te-modal-dialog-ref
      class="pointer-events-none flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center justify-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
    >
      <div
        class="pointer-events-auto fixed lg:top-24 top-56 flex items-center w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-2xl outline-none dark:bg-transparent"
      >
        <div class="flex pb-6 lg:justify-end rounded-t-md lg:w-[50rem] w-full relative">
          <button
            type="button"
            class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none absolute lg:right-0 -right-40 bottom-4"
            aria-label="Close"
            @click="$emit('closeModal', false)"
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
        <div class="lg:h-[500px] lg:w-[50rem] min-w-max">
          <iframe
            :src="props.link"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; "
            allowfullscreen
            class="lg:w-full lg:h-full w-full z-[2000]"
          ></iframe>
        </div>
        <!--Modal footer-->
      </div>
    </div>
  </div>
</template>
