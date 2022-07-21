import { defineStore } from "pinia";
import type { Todo, Categories } from "./utils";
export const useTodoStore = defineStore("todos", {
  state: () => ({
    value: [] as Todo[],
  }),
});


export const useCategoryStore = defineStore("categories", {
  state: () => ({
    value: [] as Categories[]
  })
})