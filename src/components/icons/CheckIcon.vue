<script setup lang="ts">
const props = defineProps<{
  width: string,
  height: string,
}>()
const ratio = 9 / 8
</script>
<template>
  <svg :width="(parseInt(props.width) * ratio).toString()" :height="props.height" viewBox="0 0 5.5 4" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.35355 0.146447C5.54882 0.341709 5.54882 0.658292 5.35355 0.853554L2.35355 3.85355C2.25979 3.94732 2.13261 4 2 4C1.86739 4 1.74021 3.94732 1.64645 3.85355L0.146447 2.35355C-0.0488155 2.15829 -0.0488155 1.84171 0.146447 1.64645C0.341709 1.45118 0.658292 1.45118 0.853554 1.64645L2 2.79289L4.64645 0.146447C4.84171 -0.0488155 5.15829 -0.0488155 5.35355 0.146447Z"
      fill="black" />

  </svg>

</template>
<style scoped>
</style>