<script setup lang="ts">
interface LabelObject {
  hueSat: string,
  text: string,
}
const props = defineProps<LabelObject>()
</script>
<template>
  <div class="px-1 flex gap-1 rounded-md items-center text-sm" :style="`background:hsl(${props.hueSat}, 90%)`">
    <div class="w-4 h-4 rounded-[50%]" :style="`background:hsl(${props.hueSat}, 50%)`"></div>
    {{ props.text }}
  </div>
</template>