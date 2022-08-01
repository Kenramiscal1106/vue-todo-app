<script setup lang='ts'>
import { useStyleStore } from "../lib/stores";

const style = useStyleStore()
</script>
<template>
  <nav class="md:hidden block dark:bg-secondary-dark p-3">
    <button @click="style.toggleCollapseVisible()"
      class="text-gray-800 hover:text-primary dark:text-secondary-accent dark:hover:text-secondary p-2 dark:hover:bg-secondary-light bg-opacity-5 hover:bg-primary-dark"><svg
        class="w-5 h-5  " viewBox="0 0 24 24">
        <path d="M5 6h14M5 12h14M5 18h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        </path>
      </svg></button>
  </nav>
</template>
<style scoped>
</style>