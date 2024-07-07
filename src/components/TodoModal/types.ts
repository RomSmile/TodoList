import { ITodoItem } from "@/types"
import { TodoItemViewMode } from "@/components/TodoList/types"

export interface ITodoModal {
  mode: TodoItemViewMode
  todoItem: ITodoItem | null
  onCloseModal: () => void
}