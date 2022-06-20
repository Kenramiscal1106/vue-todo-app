<script>

</script>

<template>
  <form @submit.prevent="addTodo" autocomplete="off" class="">
    <div>
      <input type="text" v-model="todoInput" id="text" placeholder="Todo:">
    </div>
    <div>
      <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
    </div>
    <div>
      <button type="submit" class="">add todo</button>
    </div>
    <template v-if="todoDeadline !== ''">
      <div v-if="isValidDeadline">valid</div>
      <div v-else-if="!isValidDeadline">
        invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
      </div>
    </template>
  </form>
</template>

<style lang="scss">
</style>