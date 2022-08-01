<script setup lang='ts'>
import { useCategoryStore, useStyleStore } from "../lib/stores";

const style = useStyleStore();
const categoryStore = useCategoryStore();
</script>
<template>
  <nav class="md:hidden dark:bg-secondary-dark p-2 flex items-center space-x-3">
    <button @click="style.toggleCollapseVisible()"
      class="text-gray-800 hover:text-primary dark:text-secondary-accent dark:hover:text-secondary p-2 dark:hover:bg-secondary-light bg-opacity-5 hover:bg-primary-dark rounded-full"><svg
        class="w-6 h-6  " viewBox="0 0 24 24">
        <path d="M5 6h14M5 12h14M5 18h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        </path>
      </svg></button>
    <div>{{ categoryStore.currentCategory ? categoryStore.currentCategory.title : "No category" }}</div>
  </nav>
</template>
<style scoped>
</style>