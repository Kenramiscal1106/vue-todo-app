<script lang="ts" setup>
import type { LabelObject, Todo } from '@/lib/utils';
import { reactive, ref, type Ref } from 'vue';
import PlusIcon from './icons/PlusIcon.vue';
import Label from './Label.vue';
const todoInput: Ref<string> = ref("")
const isValidDeadline: Ref<boolean> = ref(true);
const labelAddIsOpen:Ref<boolean> = ref(false);
// const hueSatPattern = //g;
const newLabel = reactive<LabelObject>({
  text: "",
  hueSat: "",
})
// watch(newLabel, () => {
//   if (newLaabel)
// } )
const { todoItems, modalOpen } = defineProps<{
  todoItems: {
    value: Todo[]
  },
  modalOpen: {
    value: boolean
  }
}>()
// const DeadlinePattern = /(^(1[0-2]|0?[0-9]):[0-5][0-9] ?(P|A)m$)|(^([0-2][0-3]|0?[1-9]):[0-5][0-9] ?$)/ig;
const todoDeadline: Ref<string> = ref("");
const deadlineType:Ref<"today" | "specific"> = ref("today")
/* watch(todoDeadline, () => {
  if (todoDeadline.value.search(DeadlinePattern) !== -1 || todoDeadline.value === "") {
    isValidDeadline.value = true
  } else {
    isValidDeadline.value = false
  }
}) */
const labels:Ref<LabelObject[]> = ref([
  {
    hueSat: "240, 100%",
    text: "ast"
  },
  {
    hueSat: "240, 100%",
    text: "ast"
  },
  {
    hueSat: "240, 100%",
    text: "ast"
  },
  {
    hueSat: "240, 100%",
    text: "ast"
  },
  {
    hueSat: "240, 100%",
    text: "A label"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
  {
    hueSat: "120, 100%",
    text: "ast"
  },
])
function addTodo() {
  if (todoInput.value != "" && isValidDeadline.value) {
    todoItems.value = [...todoItems.value, {
      done: false,
      id: Math.random() * 1000,
      text: todoInput.value,
      deadline: todoDeadline.value
    }]
    todoInput.value = ''
    todoDeadline.value = ""
    modalOpen.value = !modalOpen.value
    return
  }
  else if (!isValidDeadline.value) {
    alert("invalid time format")
    return
  }
  else {
    alert("You haven't entered any 😠")
  }
}
</script>

<template>
  <form @submit.prevent="addTodo" autocomplete="off" class="p-8 bg-gray-200 max-w-md" @click.stop="">
    <div class="form-subcontainer">
      <div>
        <input type="text" v-model="todoInput" id="text" placeholder="Enter todo" class="w-full">
      </div>
      <div>
        <div for="">Deadline: </div>
        <input id="deadline-today" v-model="deadlineType" type="radio" name="deadline" value="today" />
        <label for="deadline-today">Today</label>
        <input id="deadline-specific" value="specific" type="radio" name="deadline" v-model="deadlineType" />
        <label for="deadline-specific">custom</label>
      </div>
      <div>
        <div v-if="deadlineType === 'specific'">
          <input type="date">
          <input type="time">
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
            <template v-for="label in labels">
                <Label :hue-sat="label.hueSat" :text="label.text"/>

            </template>
        </div>
        <button @click.prevent="() => {
          labelAddIsOpen = !labelAddIsOpen
        }">{{labelAddIsOpen ? "Close" : ""}} {{labelAddIsOpen ? "a" : "A"}}dd new Label <PlusIcon width="18" height="18" v-if="!labelAddIsOpen"/></button>
        <div v-if="labelAddIsOpen">
          <div>
            <input type="text" placeholder="Type hue and saturation values here..."/>
          </div>
          <input type="text" placeholder="Type label text...">
        </div>
      </div>
      <!-- <div>
        <input type="text" id="deadline" v-model="todoDeadline" placeholder="Due:">
      </div> -->
      <div class="flex gap-2 justify-end">
        <button type="submit"><PlusIcon width="18" height="18"/>Add todo</button>
      </div>
      <!-- <template v-if="todoDeadline !== ''">
        <div v-if="isValidDeadline">valid</div>
        <div v-else-if="!isValidDeadline">
          invalid property value; the time format must be: HH:MM AM/PM (12-hour) or HH:MM (24-hour)
        </div>
      </template> -->
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-subcontainer > div{
  @apply my-3 text-left;
}
input[type="text"] {
  @apply placeholder:text-black py-3 px-4 w-full;
}
form :is(button, [type="submit"]) {
  @apply px-4 py-2 bg-gray-300
  hover:bg-gray-400 flex items-center gap-2;
}
</style>