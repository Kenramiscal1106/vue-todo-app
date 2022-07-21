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
useTodoStore()
export const useCategoryStore = defineStore("category", {
  state: () => ({
    value: [{
      id: randomUUID(),
      title: "Important",
      color: "blue"
    },{
      id: randomUUID(),
      title: "Important",
      color: "blue"
    },{
      id: randomUUID(),
      title: "Important",
      color: "blue"
    },{
      id: randomUUID(),
      title: "Important",
      color: "blue"
    },{
      id: randomUUID(),
      title: "Important",
      color: "blue"
    }] as Category[]
  }),
  actions: {
    addCategory(category: Category) {
      this.value.push(category)
    },
    removeCategory(categoryId:string) {
      this.value = this.value.filter(category => category.id !== categoryId)
    }
  }
})