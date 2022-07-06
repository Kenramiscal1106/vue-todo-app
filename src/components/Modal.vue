<script lang="ts" setup>
  const {modalOpen} = defineProps<{
    modalOpen: {
      value:boolean
    }
  }>()
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 backdrop-blur-sm grid place-content-center modal z-10" @click="modalOpen.value = false">
    <slot></slot>
  </div>
</template> 

<style lang="scss" scoped>
  @keyframes fade-in {
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  .modal {
    animation: fade-in 200ms forwards;
  }
</style>