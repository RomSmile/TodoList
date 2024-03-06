import { ITodoItem } from "@/types.ts"
import { TodoItemViewMode } from "@/components/TodoList/types.ts"

export interface ITodoModal {
  mode: TodoItemViewMode
  todoItem: ITodoItem | null
  onCloseModal: () => void
}