import { FC, ReactNode } from "react"
import { ITodoModal } from "@/components/TodoModal/types.ts"
import { TodoItemViewMode } from "@/components/TodoList/types.ts"
import EditModal from "@/components/TodoModal/components/EditModal"
import ViewModal from "@/components/TodoModal/components/ViewModal"

const TodoModal: FC<ITodoModal> = ({
  mode,
  todoItem,
  onCloseModal,
  index
}): ReactNode => {
  return mode === TodoItemViewMode.edit ?
    <EditModal todoItem={todoItem} onCloseModal={onCloseModal} index={index} />
    : <ViewModal todoItem={todoItem} onCloseModal={onCloseModal} />
}

export default TodoModal