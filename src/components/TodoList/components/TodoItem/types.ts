import { ITodoItem } from "@/types.ts"
import { ModalStateType } from "@/components/TodoList/types.ts"
import { Dispatch, SetStateAction } from "react"

export interface ITodoItemComponent extends ITodoItem {
  index: number
  setOpenModal: Dispatch<SetStateAction<ModalStateType>>
}