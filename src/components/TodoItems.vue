<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  todos: { value: Todo[] };
  specificTodoItem: Todo;
  currentTimeRef:Date
}
type Date = {
  timeString: Function;
  hour: number;
  minute: number;
  seconds: number;
  twelveHourSplit?: Function;
};
type Todo = {
  deadline: string;
  done: boolean;
  id: number;
  text: string;
};
const props = defineProps<Props>();
function toggleDone(todoItemsArray: Todo[], todoItem: Todo): void {
  props.todos.value = todoItemsArray.map((item) => {
    if (item.id === todoItem.id) {
      return {
        id: item.id,
        done: !todoItem.done,
        text: item.text,
        deadline: item.deadline,
      };
    }
    return item;
  });
}
function pastDeadline(todoDeadline: string, currentTime: Date): boolean {
  if (todoDeadline === "") {
    return false;
  }
  function convertTo24HourFormat(todoDeadline: string): string {
    const AMorPM = todoDeadline.match(/(A|P)/gi)?.join();
    const removedAMPM = todoDeadline.replace(/(A|P)m$/gi, "");
    const time = removedAMPM.match(/\d+/gi);
    let hour, minute;
    if (time && typeof AMorPM !== "undefined") {
      hour = parseInt(time[0]);
      minute = time[1];
      if(AMorPM.toLowerCase() === "p" && hour < 12) {
        hour += 12
      } else if (AMorPM.toLowerCase() === "a" && hour === 12 ) {
        hour = 0;
      }
    } else {
      throw new Error("Parsing error");
    }
    return `${hour}:${minute}`;
  }
  function decompose(todoDeadline: string): {
    hour: number;
    minute: number;
    totalMinutes: number;
  } {
    let hour, minute;
    const hourMinuteArray = todoDeadline.match(/\d+/gi);
    if (hourMinuteArray) {
      [hour, minute] = hourMinuteArray;
    }
    if (typeof hour !== "undefined" && typeof minute !== "undefined") {
      const totalMinutes = parseInt(hour) * 60 + parseInt(minute);
      return {
        hour: parseInt(hour),
        minute: parseInt(minute),
        totalMinutes,
      };
    }
    return {
      hour: NaN,
      minute: NaN,
      totalMinutes: NaN,
    };
  }
  const convertedFormat =
    todoDeadline.search(/(A|P)m$/gi) !== -1
      ? convertTo24HourFormat(todoDeadline)
      : todoDeadline;
  const decomposeConvertedFormat = decompose(convertedFormat);
  if (
    currentTime.hour * 60 + currentTime.minute >=
    decomposeConvertedFormat.totalMinutes
  ) {
    return true;
  }
  return false;
}
function removeTodo(todoItemsArray: Todo[], todoItem: Todo): void {
  props.todos.value = todoItemsArray.filter((item) => item.id !== todoItem.id);
}
</script>

<template>
  <button
    :class="`flex-1 text-left mark-as-done-button todo-item ${
      specificTodoItem.done ? 'todo-is-done ' : ''
    }`"
    @click="toggleDone(todos.value, specificTodoItem)"
  >
    <input type="checkbox" name="" id="" v-model="specificTodoItem.done" />{{
      specificTodoItem.text
    }}
    <div class="todo-item-side">
      <span
        v-if="pastDeadline(specificTodoItem.deadline, currentTimeRef) && !specificTodoItem.done"
        class="text-red-600 flex items-center ml-auto"
        ><img src="./../assets/alarm.svg" alt="" />
        Past due Date
        <audio autoplay loop>
          <source
            src="./../assets/mixkit-facility-alarm-908.wav"
            type="audio/wav"
          />
        </audio>
      </span>
      <span v-if="specificTodoItem.deadline !== ''"
        >Deadline: {{ specificTodoItem.deadline }}</span
      >
      <span class="option-buttons">
        <button
          @click="removeTodo(todos.value, specificTodoItem)"
          class="remove-button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.2306 33.2306L3.76933 3.76936M3.76933 33.2306L33.2306 3.76936"
              stroke="currentColor"
              stroke-width="7"
            />
          </svg>
        </button>
        <button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="18.5" r="4.5" fill="currentColor" />
            <circle cx="18.5" cy="18.5" r="4.5" fill="currentColor" />
            <circle cx="29.5" cy="18.5" r="4.5" fill="currentColor" />
          </svg>
        </button>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
