import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITodoItem, TodoStatusEnum } from "@/types"
import { validateTodoItem } from "@/store/todoSlice/helpers"
import { createTodo, getTodos, updateTodoItem } from "./actions"
import {toast} from "react-toastify";


interface IInitialState {
  todos: ITodoItem[]
  loading: boolean,
  error: string,
}

const initialState: IInitialState = {
  todos: [],
  loading: false,
  error: ''
}

export const TodoSlice = createSlice({
  name: 'TodoStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///get
    builder.addCase(getTodos.pending, (state: IInitialState) => {
      state.loading = true
    })

    builder.addCase(getTodos.fulfilled, (state: IInitialState, action: PayloadAction<ITodoItem[]>) => {
      const { payload } = action;
      state.todos = [ ...payload ];
      state.loading = false;
      state.error = '';
    })

    builder.addCase(getTodos.rejected, (state: IInitialState, action) => {
      state.error = action.payload as unknown as string;
      state.loading = false;
    })

    ///create

    builder.addCase(createTodo.pending, (state: IInitialState) => {
      state.loading = true
    })

    builder.addCase(createTodo.fulfilled, (state: IInitialState, action: PayloadAction<{message: string, status: number, todoItem: ITodoItem}>) => {
      const { message, status, todoItem } = action.payload;

      toast(`${message}, ${status}`, {
        type: 'success',
      })

      state.todos = [ ...state.todos, { ...todoItem }];
      state.loading = false;
      state.error = '';
    })

    builder.addCase(createTodo.rejected, (state: IInitialState, action) => {
      state.error = action.payload as unknown as string;
      state.loading = false;
    })
    ///update
    builder.addCase(updateTodoItem.pending, (state: IInitialState) => {
      state.loading = true
    })

    builder.addCase(updateTodoItem.fulfilled, (state: IInitialState, action: PayloadAction<{ todoItem: ITodoItem }>) => {
      const { todoItem } = action.payload;

      toast(`successfully updated`, {
        type: 'success',
      })

      state.todos = [ ...state.todos ].map(item => item.id === todoItem.id ? { ...todoItem } : item);
      state.loading = false;
      state.error = '';
    })


    builder.addCase(updateTodoItem.rejected, (state: IInitialState, action) => {
      state.error = action.payload as unknown as string;
      state.loading = false;
    })
  }
})

export const {  } = TodoSlice.actions