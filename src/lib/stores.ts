import { defineStore } from "pinia";
import type { Todo, Categories as Category } from "./utils";
import {v4 as randomUUID} from "uuid"
export const useTodoStore = defineStore("todos", {
  state: () => ({
    value: [] as Todo[],
  }),
  getters: {
    getTodosByCategory: (state) =>  {
      return (categoryId:string) => state.value.filter(todo => {
        todo.categoryId === categoryId
      })
    }
  },
  actions: {
    removeItem(id:string) {
      this.value = this.value.filter((todo) => todo.id !== id)
    },
    addItem(todo:Todo) {
      this.value.push(todo)
    }
  }
});

export const useCategoryStore = defineStore("category", {
  state: () => ({
    value: [] as Category[],
    currentIndex: 0
  }),
  actions: {
    addCategory(category: Category) {
      this.value.push(category)
    },
    removeCategory(categoryId:string) {
      this.value = this.value.filter(category => category.id !== categoryId)
    }
  },
  getters: {
    currentCategory(state) {
      if (state.value.length === 0 || state.currentIndex > state.value.length - 1) {
        return null
      }
      return state.value[state.currentIndex]
    }
  }
})