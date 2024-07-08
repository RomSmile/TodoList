import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITodoItem, TodoStatusEnum } from "@/types";

export const getTodos = createAsyncThunk<
  ITodoItem[],
  {},
  { rejectValue: string }
>("getTodos", async ({}, { rejectWithValue }) => {
  try {
    const response: { data: ITodoItem[] } = await axios.get(
      `${document.location.href}api/todos`,
    );

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.message);
  }
});

export const createTodo = createAsyncThunk<
  {message: string, status: number, todoItem: ITodoItem},
  Omit<ITodoItem, 'status' | 'id'>,
  { rejectValue: string }
>("createTodo", async (params, { rejectWithValue }) => {
  try {
    const id = Math.floor(Math.random() * (1000000 - 9999999 + 1) + 1000000)
    const response = await axios.post(`${document.location.href}api/todos`, {
      ...params,
      id: id <= 0 ? id * -1 : id,
      status: TodoStatusEnum.notFinished 
    })

    return { status: response.status, message: "success", todoItem: {
      ...params,
      id: id <= 0 ? id * -1 : id,
      status: TodoStatusEnum.notFinished 
    }}
  } catch (e: any) {
    return rejectWithValue(e.response.data.message);
  }
})

export const updateTodoItem = createAsyncThunk<
  { todoItem: ITodoItem },
  { todoItem: ITodoItem },
  { rejectValue: string }
>("updateTodo", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${document.location.href}api/todos/${params.todoItem.id}`, {
      ...params.todoItem
    })

    return { todoItem: response.data as ITodoItem }
  } catch (e: any) {
    return rejectWithValue(e.response.data.message);
  }
})
