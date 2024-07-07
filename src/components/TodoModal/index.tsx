import { FC } from "react"
import { ITodoModal } from "@/components/TodoModal/types"
import { TodoItemViewMode } from "@/components/TodoList/types"
import EditModal from "@/components/TodoModal/components/EditModal"
import ViewModal from "@/components/TodoModal/components/ViewModal"

const TodoModal: FC<ITodoModal> = ({
  mode,
  todoItem,
  onCloseModal,
}) => {
  return mode === TodoItemViewMode.edit ?
    <EditModal todoItem={todoItem} onCloseModal={onCloseModal} />
    : <ViewModal todoItem={todoItem} onCloseModal={onCloseModal} />
}

export default TodoModal