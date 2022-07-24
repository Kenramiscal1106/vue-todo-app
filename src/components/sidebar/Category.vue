<script setup lang='ts'>
import { useCategoryStore } from '../../lib/stores';

  const {isActive} = defineProps<{
    isActive: boolean
  }>()
  const categories = useCategoryStore()
</script>
<template>
  <button :class="['rounded-md px-2 py-1 text-left ', {'hover:bg-primary active:bg-primary-dark dark:hover:bg-secondary dark:active:bg-secondary-dark': !isActive, 'bg-primary-dark dark:bg-secondary-dark': isActive }]"><slot></slot></button>
</template>
<style scoped>
  
</style>