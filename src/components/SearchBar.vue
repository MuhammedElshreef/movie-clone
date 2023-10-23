<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  prevRoute: String
})
const route = useRoute()
const router = useRouter()
const name = ref(route.query.q)
watch(name, () => {
  router.push({ path: '/search', query: { q: `${name.value}` } })
  // here fix the back
  setTimeout(() => {
    if (route.query.q == '') {
      router.push({ path: `${props.prevRoute}` })
    }
  }, 100)
})
</script>
<template>
  <div class="z-[1990] fixed w-full right-0 lg:pl-[5rem] focus:outline" v-motion-slide-top>
    <div class="relative min-w-max">
      <!-- fix the text when u write so much -->
      <input
        type="text"
        class="w-full lg:h-24 h-16 px-10 bg-[#202124] text-gray-200"
        placeholder="Search for a movie, tv show  or person..."
        v-model="name"
      />
      <button
        class="absolute lg:top-7 top-4 right-6 z-[1991]"
        @click="router.push({ path: `${props.prevRoute}` })"
        v-if="name"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="text-gray-200"
          class="w-8 h-8"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
