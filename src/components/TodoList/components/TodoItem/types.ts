import { ITodoItem } from "@/types"
import { ModalStateType } from "@/components/TodoList/types"
import { Dispatch, SetStateAction } from "react"

export interface ITodoItemComponent extends ITodoItem {
  index: number
  setOpenModal: Dispatch<SetStateAction<ModalStateType>>
}