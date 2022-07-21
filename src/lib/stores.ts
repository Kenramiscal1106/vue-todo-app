import { defineStore } from "pinia";
import type { Todo, Categories } from "./utils";
import {v4 as randomUUID} from "uuid"
export const useTodoStore = defineStore("todos", {
  state: () => ({
    value: [] as Todo[],
  }),
});


export const useCategoryStore = defineStore("categories", {
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
    }] as Categories[]
  })
})