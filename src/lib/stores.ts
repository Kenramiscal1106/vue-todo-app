import { defineStore } from "pinia";
import type { Todo, Categories } from "./utils";
export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
});


export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [] as Categories[]
  })
})