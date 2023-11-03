<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  prevRoute: String
})
const route = useRoute()
const router = useRouter()
const name = ref(route.query.q)
const input = ref(null)
watch(name, () => {
  router.push({ path: '/search', query: { q: `${name.value}` } })
  setTimeout(() => {
    if (route.query.q == '') {
      router.push({ path: `${props.prevRoute}` })
      
    }
  }, 100)
})
onMounted(() => {
  input.value.focus()
})
</script>
<template>
  <div class="z-[1990] fixed w-full right-0 lg:pl-[5rem]" v-motion-slide-top>
    <div class="relative min-w-max">
      <!-- fix the text when u write so much -->
      <input
        type="text"
        ref="input"
        class="w-full lg:h-24 h-16 px-10 bg-[#202124] text-gray-200 focus:outline-none"
        placeholder="Search for a movie, tv show  or person..."
        v-model="name"
      />
      <button
        class="absolute lg:top-9 top-4 right-8 text-gray-300"
        @click="router.push({ path: `${props.prevRoute}` })"
        v-if="name"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
