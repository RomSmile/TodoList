import { Input, Modal } from "antd"
import { ChangeEvent, FC, useState } from "react"
import { ITodoItem, TodoStatusEnum } from "@/types.ts"
import { addTodo, editTodoItem } from "@/store/todoSlice"
import { useAppDispatch } from "@/hooks/redux.ts"
import { ITodoModal } from "@/components/TodoModal/types.ts"

const EditModal: FC<Omit<ITodoModal, 'mode' | 'index'>> = ({
  todoItem,
  onCloseModal,
}) => {
  const dispatch = useAppDispatch()
  const [newTodoItem, setNewTodoItem] = useState<ITodoItem | null>(
    todoItem === null
      ? { title: '', text: '', id: '', status: TodoStatusEnum.notFinished }
      : todoItem
  )

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setNewTodoItem({ ...newTodoItem as ITodoItem, [name as "title" | "text"]: value})
  }

  const onSaveTodoItem = (): void => {
    if (todoItem === null) {
      dispatch(addTodo(newTodoItem as ITodoItem))
    } else {
      dispatch(editTodoItem({ id: todoItem.id, todoItem: newTodoItem as ITodoItem }))
    }
    onCloseModal()
  }

  return (
    <Modal
      title={"Edit todo item"}
      open={true}
      onOk={onSaveTodoItem}
      onCancel={onCloseModal}
    >
      <label>
        <p>Title:</p>
        <Input value={newTodoItem?.title} name="title" onChange={onInputChange} />
      </label>
      <label>
        <p>Text:</p>
        <Input value={newTodoItem?.text} name="text" onChange={onInputChange} />
      </label>
    </Modal>
  )
}

export default EditModal
