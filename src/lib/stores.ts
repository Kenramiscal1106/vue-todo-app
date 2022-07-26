import { acceptHMRUpdate, defineStore } from "pinia";
import type { Todo, Category } from "./utils";
export const useTodoStore = defineStore("todos", {
  state: () => ({
    value: [] as Todo[],
  }),
  getters: {
    getTodosByCategory: (state) =>  {
      return (categoryId:string) => state.value.filter(todo => todo.categoryId === categoryId)
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
    currentId: ""
  }),
  actions: {
    addCategory(category: Category) {
      this.value.push(category)
    },
    removeCategory(categoryId:string) {
      this.value = this.value.filter(category => category.id !== categoryId)
    },
    setId(categoryId:string) {
      this.currentId = categoryId
    }
  },
  getters: {
    currentCategory(state) {
      /* if (state.value.length === 0 || state.currentId > state.value.length - 1) {
        return null
      }
      return state.value[state.currentId] */
      if (state.value.length === 0 || state.currentId === "") {
        return null
      }
      const currentCategoryValue = state.value.find(category => category.id === state.currentId)
      if (typeof currentCategoryValue === "undefined") return null;
      return currentCategoryValue
    },
    lastCategory: (state) => {
      return state.value[state.value.length - 1]
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}