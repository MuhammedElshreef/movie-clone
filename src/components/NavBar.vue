<script setup></script>
<template>
  <div
    class="fixed bg-[#141414] min-h-screen w-20 border-r-[0.1px] border-gray-500 flex flex-col items-center pt-9 gap-16"
  >
    <router-link to="/">
      <button>
        <img src="../assets/icons/homeIcon.svg" class="w-8" alt="" />
      </button>
    </router-link>
    <router-link to="/movie">
      <button>
        <img src="../assets/icons/movieIcon.svg" class="w-8" alt="" />
      </button>
    </router-link>
    <router-link to="/tv">
      <button>
        <img src="../assets/icons/tvIcon.svg" class="w-8" alt="" />
      </button>
    </router-link>
    <router-link to="/search">
      <button>
        <img src="../assets/icons/searchIcon.svg" class="w-8" alt="" />
      </button>
    </router-link>
    <router-link to="/favorite">
      <button>
        <img src="../assets/icons/favoriteIcon.svg" class="w-8" alt="" />
      </button>
    </router-link>
  </div>
</template>
