<script setup lang='ts'>
import { useStyleStore } from '../lib/stores';

const { time } = defineProps<{ time: string }>()
const style = useStyleStore()
</script>
<template>
  <div class="absolute h-full w-full top-0 md:hidden bg-secondary-dark bg-opacity-40"
    :class="{ 'hidden': !style.collapseVisible }" @click="style.toggleCollapseVisible">

  </div>
  <aside
    class="absolute w-64 top-0 h-full transition-[left] duration-300 md:static flex-grow-0 flex-shrink-0 basis-64 bg-primary-light dark:bg-secondary-light space-y-2 px-4 py-3 overflow-auto"
    :class="[!style.collapseVisible ? '-left-full' : 'left-0']">
    <div class="flex items-center gap-3">
      <h3 class="font-semibold">Categories</h3>
      <h4 class="font-medium">{{ time }}</h4>
    </div>
    <div class="space-y-1 flex flex-col items-stretch">
      <slot></slot>
    </div>
  </aside>
</template>
<style scoped>
</style>