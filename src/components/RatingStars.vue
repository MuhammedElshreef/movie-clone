<script setup>
const prop = defineProps({
  rating: Number
})
</script>
<template>
  <div>
    <ul class="my-1 flex list-none gap-1 p-0">
      <li v-for="i in 5" :key="i">
        <span class="text-primary [&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            :class="[i <= prop.rating / 2 ? 'fill-[#2391FF] text-[#2391FF]' : 'stroke-[#2391FF]']"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>
