<script lang="ts" setup>
  const props = defineProps<{
    tooltipMessage:string,
    position:"top" | "bottom" | "left" | "right"
  }>()
</script>
<template>
  <div class="tooltip">
    <slot></slot>
    <div :class="'tooltip-content ' + props.position">
      {{props.tooltipMessage}}
    </div>
  </div>
</template>
<style scoped lang="scss">
  .tooltip {
    @apply relative;
    &:hover > .tooltip-content{
      @apply visible opacity-100;
    }
  }
  .tooltip-content {
    @apply absolute transition-opacity duration-100  w-max text-white bg-gray-600 px-4 py-2;
    visibility: hidden;
    opacity:0;
    &.top {
      @apply bottom-[125%] left-1/2 -translate-x-1/2;
    }
  }
</style>