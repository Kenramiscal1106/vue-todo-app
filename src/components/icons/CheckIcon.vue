<script setup lang="ts">
  const props = defineProps<{
    width:string,
    height:string,
  }>()
  const ratio = 9/8
</script>
<template>
  <svg :width="(parseInt(props.width) * ratio).toString()" :height="props.height" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.96963 0.96967C7.26253 0.676777 7.7374 0.676777 8.03029 0.96967C8.31959 1.25897 8.32314 1.72582 8.04094 2.01947L4.04873 7.00973C4.04297 7.01693 4.03682 7.02381 4.03029 7.03033C3.7374 7.32322 3.26253 7.32322 2.96963 7.03033L0.323186 4.38388C0.0302923 4.09099 0.0302923 3.61612 0.323186 3.32322C0.616079 3.03033 1.09095 3.03033 1.38385 3.32322L3.47737 5.41674L6.94974 0.992105C6.95592 0.984235 6.96256 0.976743 6.96963 0.96967Z"
      fill="black" />
  </svg>

</template>
<style scoped>
</style>