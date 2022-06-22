<script setup lang="ts">
  const props = defineProps<{
    width:string,
    height:string,
  }>()
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 207 207" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="103.5" cy="103.5" r="100" stroke="currentColor" fill="none" stroke-width="7" />
    <circle cx="155" cy="68" r="12" fill="currentColor" />
    <circle cx="51" cy="68" r="12" fill="currentColor" />
    <path d="M76.0118 156C75.4168 136.207 97.429 130.817 103.003 153C108.578 130.817 130.388 136.207 129.995 156"
      stroke="currentColor" stroke-width="5" fill="none"/>
  </svg>

</template>
<style scoped>
</style>