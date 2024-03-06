import { ITodoItem } from "@/types.ts"
import { ModalStateType } from "@/components/TodoList/types.ts"
import { Dispatch, SetStateAction } from "react"

export interface ITodoItemComponent extends Omit<ITodoItem, 'id'> {
  index: number
  setOpenModal: Dispatch<SetStateAction<ModalStateType>>
}