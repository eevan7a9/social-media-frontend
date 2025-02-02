<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex w-full bg-white py-3 lg:py-4 max-w-screen-lg mx-auto">
      <ul class="flex gap-3 mr-0 ml-auto">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </ul>
    </nav>
  </header>

  <main class="block bg-light dark:bg-dark min-h-screen">
    <RouterView />
  </main>
</template>

<style scoped></style>
