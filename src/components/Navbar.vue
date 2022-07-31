<script setup lang='ts'>
import { useStyleStore } from "../lib/stores";

const style = useStyleStore()
</script>
<template>
  <nav class="md:hidden block dark:bg-secondary-dark p-4">
    <button @click="style.toggleCollapseVisible()">open sidebar</button>
  </nav>
</template>
<style scoped>
</style>