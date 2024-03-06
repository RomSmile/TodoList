import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'
import { ITodoItem, TodoStatusEnum } from "@/types.ts"
import { validateTodoItem } from "@/store/todoSlice/helpers.ts"

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
    changeTodoStatus: (state, action: PayloadAction<{ id: string, status: TodoStatusEnum}>) => {
      const { id, status } = action.payload
      const indexOfTodo = state.todos.findIndex((todoItem) => todoItem.id === id)

      state.todos[indexOfTodo].status = status
    },
    editTodoItem: (state, action: PayloadAction<{ id: string, todoItem: ITodoItem}>) => {
      const { id, todoItem } = action.payload
      const indexOfTodo = state.todos.findIndex((todoItem) => todoItem.id === id)

      if (validateTodoItem(action.payload.todoItem)) {
        state.todos[indexOfTodo] = todoItem
      }
    }
  },
})

export const { addTodo, changeTodoStatus, editTodoItem } = TodoSlice.actions