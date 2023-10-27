<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import CastersCarousel from '../components/CastersCarousel.vue'
const route = useRoute()
const showSocial = ref([])
onMounted(() => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${route.params.id}/external_ids`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then(function (response) {
      showSocial.value = response.data
      console.log()
    })
    .catch(function (error) {
      console.error(error)
    })
})
const props = defineProps({
  show: Array
})
</script>
<template>
  <div v-motion-fade>
    <div class="lg:container px-[1rem] pt-6 flex gap-16">
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.show.poster_path}`"
        class="h-[403px] w-[268px] lg:block hidden"
        alt=""
      />
      <div class="flex flex-col gap-6 text-white">
        <span class="lg:text-3xl text-2xl">Storyline</span>
        <p class="lg:text-base text-sm">{{ props.show.overview }}</p>
        <div class="flex flex-col gap-2">
          <div class="flex lg:gap-16 gap-8" v-if="props.show.first_air_date">
            <span class="w-24">First Aired</span>
            <p>{{ props.show.first_air_date }}</p>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.last_air_date">
            <span class="w-24">Last Aired</span>
            <p>{{ props.show.last_air_date }}</p>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.episode_run_time.length != 0">
            <span class="w-24">Runtime</span>
            <p>{{ props.show.episode_run_time[0] }}</p>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.created_by">
            <span class="w-24">Creator</span>
            <div class="flex gap-2">
              <a
                v-for="creator in props.show.created_by"
                :key="creator.id"
                :href="`/person/${creator.id}`"
                class="text-[#1E89DE] underline"
              >
                {{ creator.name }}
              </a>
            </div>
          </div>
          <!-- add page for the route -->
          <div class="flex lg:gap-16 gap-8" v-if="props.show.genres">
            <span class="w-24">Genre</span>
            <div class="flex gap-2">
              <a
                v-for="genre in props.show.genres"
                :key="genre.id"
                class="text-[#1E89DE] underline"
              >
                {{ genre.name }}
              </a>
            </div>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.number_of_seasons">
            <span class="w-24">Seasons</span>
            <p>{{ props.show.number_of_seasons }}</p>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.number_of_episodes">
            <span class="w-24">Episodes</span>
            <p>{{ props.show.number_of_episodes }}</p>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.status">
            <span class="w-24">Status</span>
            <p>{{ props.show.status }}</p>
          </div>
          <div class="flex lg:gap-16 gap-8" v-if="props.show.languages">
            <span class="w-24">Language</span>
            <div class="flex gap-2">
              <p v-for="lang in props.show.languages" :key="lang.id">{{ lang }}</p>
            </div>
          </div>
          <!-- fix the network here  -->
          <!-- <div class="flex lg:gap-16 gap-8" v-if="props.show.networks">
          <span class="w-24">Network</span>
          <div class="flex">
            <span v-for="network in props.show.networks" :key="network.id">{{ network.name }}</span>
          </div>
        </div> -->
          <div class="flex gap-4 py-6">
            <a
              v-if="showSocial.twitter_id"
              :href="`https://twitter.com/${showSocial.twitter_id}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="lg:w-8 lg:h-10 w-8 h-8 fill-white hover:fill-[#1E89DE] cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"
                ></path>
              </svg>
            </a>
            <a
              v-if="showSocial.facebook_id"
              :href="`https://www.facebook.com/${showSocial.facebook_id}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="lg:w-8 lg:h-10 w-8 h-8 fill-white hover:fill-[#1E89DE] cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"
                ></path>
              </svg>
            </a>
            <a
              v-if="showSocial.instagram_id"
              :href="`https://www.instagram.com/${showSocial.instagram_id}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="lg:w-8 lg:h-10 w-8 h-8 fill-white hover:fill-[#1E89DE] cursor-pointer"
                viewBox="0 0 448 512"
              >
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
            <a
              v-if="showSocial.imdb_id"
              :href="`https://www.imdb.com/title/${showSocial.imdb_id}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="lg:w-8 lg:h-10 w-8 h-8 fill-white hover:fill-[#1E89DE] cursor-pointer"
                viewBox="0 0 448 512"
              >
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M89.5 323.6H53.93V186.2H89.5V323.6zM156.1 250.5L165.2 186.2H211.5V323.6H180.5V230.9L167.1 323.6H145.8L132.8 232.9L132.7 323.6H101.5V186.2H147.6C148.1 194.5 150.4 204.3 151.9 215.6L156.1 250.5zM223.7 323.6V186.2H250.3C267.3 186.2 277.3 187.1 283.3 188.6C289.4 190.3 294 192.8 297.2 196.5C300.3 199.8 302.3 203.1 303 208.5C303.9 212.9 304.4 221.6 304.4 234.7V282.9C304.4 295.2 303.7 303.4 302.5 307.6C301.4 311.7 299.4 315 296.5 317.3C293.7 319.7 290.1 321.4 285.8 322.3C281.6 323.1 275.2 323.6 266.7 323.6H223.7zM259.2 209.7V299.1C264.3 299.1 267.5 298.1 268.6 296.8C269.7 294.8 270.4 289.2 270.4 280.1V226.8C270.4 220.6 270.3 216.6 269.7 214.8C269.4 213 268.5 211.8 267.1 210.1C265.7 210.1 263 209.7 259.2 209.7V209.7zM316.5 323.6V186.2H350.6V230.1C353.5 227.7 356.7 225.2 360.1 223.5C363.7 222 368.9 221.1 372.9 221.1C377.7 221.1 381.8 221.9 385.2 223.3C388.6 224.8 391.2 226.8 393.2 229.5C394.9 232.1 395.9 234.8 396.3 237.3C396.7 239.9 396.1 245.3 396.1 253.5V292.1C396.1 300.3 396.3 306.4 395.3 310.5C394.2 314.5 391.5 318.1 387.5 320.1C383.4 324 378.6 325.4 372.9 325.4C368.9 325.4 363.7 324.5 360.2 322.9C356.7 321.1 353.5 318.4 350.6 314.9L348.5 323.6L316.5 323.6zM361.6 302.9C362.3 301.1 362.6 296.9 362.6 290.4V255C362.6 249.4 362.3 245.5 361.5 243.8C360.8 241.9 357.8 241.1 355.7 241.1C353.7 241.1 352.3 241.9 351.6 243.4C351 244.9 350.6 248.8 350.6 255V291.4C350.6 297.5 351 301.4 351.8 303C352.4 304.7 353.9 305.5 355.9 305.5C358.1 305.5 360.1 304.7 361.6 302.9L361.6 302.9zM418.4 32.04C434.1 33.27 447.1 47.28 447.1 63.92V448.1C447.1 464.5 435.2 478.5 418.9 479.1C418.6 479.1 418.4 480 418.1 480H29.88C29.6 480 29.32 479.1 29.04 479.9C13.31 478.5 1.093 466.1 0 449.7L.0186 61.78C1.081 45.88 13.82 33.09 30.26 31.1H417.7C417.9 31.1 418.2 32.01 418.4 32.04L418.4 32.04zM30.27 41.26C19 42.01 10.02 51.01 9.257 62.4V449.7C9.63 455.1 11.91 460.2 15.7 464C19.48 467.9 24.51 470.3 29.89 470.7H418.1C429.6 469.7 438.7 459.1 438.7 448.1V63.91C438.7 58.17 436.6 52.65 432.7 48.45C428.8 44.24 423.4 41.67 417.7 41.26L30.27 41.26z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <CastersCarousel />
  </div>
</template>
