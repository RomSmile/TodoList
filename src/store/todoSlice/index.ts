import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'
import { toast } from "react-toastify"
import { ITodoItem, TodoStatusEnum } from "@/types.ts"
import { validateTodoItem } from "@/store/todoSlice/helpers.ts";

interface IInitialState {
  todos: ITodoItem[]
}

const initialState: IInitialState = {
  todos: [],
}

export const TodoSlice = createSlice({
  name: 'TodoStore',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoItem>) => {
      if (validateTodoItem(action.payload)) {
        state.todos = [ ...state.todos, { ...action.payload, id: uuidv4(), status: TodoStatusEnum.notFinished } ]
      }
    },
    changeTodoStatus: (state, action: PayloadAction<{ index: number, status: TodoStatusEnum}>) => {
      const { index, status } = action.payload

      if (index < state.todos.length) {
        state.todos[index].status = status
      } else {
        toast("this task does not exist", {
          type: "error",
        })
      }
    },
    editTodoItem: (state, action: PayloadAction<{ index: number, todoItem: ITodoItem}>) => {
      const { index, todoItem } = action.payload
      if (validateTodoItem(action.payload.todoItem)) {
        state.todos[index] = todoItem
      }
    }
  },
})

export const { addTodo, changeTodoStatus, editTodoItem } = TodoSlice.actions