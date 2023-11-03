<script setup>
import { ref } from 'vue'
import PersonOverview from '../components/PersonOverview.vue'
import PersonNav from '../components/PersonNav.vue'
import KnownForPage from '../components/KnownForPage.vue'
// import CreditsPage from '../components/CreditsPage.vue'
import PersonPhotos from '../components/PersonPhotos.vue'
import Footer from '../components/Footer.vue'
const activeTap = ref('KnownForPage')
const taps = {
  KnownForPage,
  // CreditsPage,
  PersonPhotos
}
function toggleTaps(e) {
  activeTap.value = e
}
window.scrollTo({
  top: 0,
  behavior: 'smooth'
})
</script>
<template>
  <div class="lg:pl-[5rem] flex flex-col gap-8">
    <PersonOverview />
    <PersonNav @active-tap="toggleTaps" />
    <component :is="taps[activeTap]"></component>
    <Footer class="container" />
  </div>
</template>
