<script setup lang='ts'>

</script>
<template>
  <button class="flex items-center gap-1 px-2 py-1 bg-accent hover:bg-accent-hover text-left"><svg width="20" height="20" viewBox="0 0 20 20"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M10 2.5C10.3452 2.5 10.625 2.77982 10.625 3.125V9.375H16.875C17.2202 9.375 17.5 9.65482 17.5 10C17.5 10.3452 17.2202 10.625 16.875 10.625H10.625V16.875C10.625 17.2202 10.3452 17.5 10 17.5C9.65482 17.5 9.375 17.2202 9.375 16.875V10.625H3.125C2.77982 10.625 2.5 10.3452 2.5 10C2.5 9.65482 2.77982 9.375 3.125 9.375H9.375V3.125C9.375 2.77982 9.65482 2.5 10 2.5Z"
        fill="white" />
    </svg>
    <slot></slot>
  </button>
</template>
<style scoped>
</style>