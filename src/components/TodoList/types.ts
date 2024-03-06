export enum TodoItemViewMode {
  'edit' = 0,
  'read' = 1
}

export type ModalStateType = {
  mode: TodoItemViewMode
  todoItemIndex: number
} | null
