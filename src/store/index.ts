import { configureStore } from '@reduxjs/toolkit'
import { TodoSlice } from "./todoSlice"


export const store = configureStore({
  reducer: {
    todo: TodoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch