<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const rootRoute = route.matched[0].path.replace(':id', route.params.id)
</script>
<template>
  <div class="flex justify-center gap-4 lg:gap-16">
    <router-link
      class="text-sm lg:text-lg hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]': route.path == rootRoute
      }"
      :to="`${rootRoute}`"
    >
      OVERVIEW
    </router-link>
    <router-link
      v-if="route.matched[0].name == 'tvDetails'"
      :to="`${rootRoute}/episodes`"
      class="text-sm lg:text-lg hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]':
          route.path == `${rootRoute}/episodes`
      }"
    >
      EPISODES
    </router-link>
    <!-- <router-link
      class="text-sm lg:text-lg hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]': false
      }"
      @click="(false), $emit('activeTap', 'VideosPage')"
    >
      VIDEOS
    </router-link> -->
    <router-link
      :to="`${rootRoute}/photos`"
      class="text-sm lg:text-lg hover:text-white"
      :class="{
        'text-white underline lg:text-2xl underline-offset-[12px]':
          route.path == `${rootRoute}/photos`
      }"
    >
      PHOTOS
    </router-link>
  </div>
</template>
