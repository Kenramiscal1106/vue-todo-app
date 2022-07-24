<script setup lang='ts'>
import { v4 as generateUUID} from 'uuid';
import { useCategoryStore } from '../../lib/stores';
  const {addCategoryVisible} = defineProps<{
    addCategoryVisible: {
      category: boolean
    }
  }>()
  const category = useCategoryStore();
  function addCategory(e) {
    const formData = Object.fromEntries(new FormData(e.target).entries());
    category.addCategory({
      id: generateUUID(),
      color: "",
      ...formData
    })
    category.setId(category.value[category.value.length - 1].id)
    addCategoryVisible.category = false
  }
</script>
<template>
  <form @submit.prevent="addCategory" class="dark:bg-secondary bg-primary px-2 py-1 rounded-md" autocomplete="off">
    <input type="text" name="title" id="" placeholder="Enter category name..." class="block bg-transparent outline-none text-white">
  </form>

</template>
<style scoped>
  
</style>