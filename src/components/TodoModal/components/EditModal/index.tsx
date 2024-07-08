import { Input, Modal } from "antd"
import { ChangeEvent, FC, useState } from "react"
import { ITodoItem, TodoStatusEnum } from "@/types"
import { useAppDispatch } from "@/hooks/redux"
import { ITodoModal } from "@/components/TodoModal/types"
import { createTodo, updateTodoItem } from "@/store/todoSlice/actions"

const EditModal: FC<Omit<ITodoModal, 'mode' | 'index'>> = ({
  todoItem,
  onCloseModal,
}) => {
  const dispatch = useAppDispatch()
  const [newTodoItem, setNewTodoItem] = useState<ITodoItem>(
    todoItem === null
      ? { title: '', text: '', id: 100000002, status: TodoStatusEnum.notFinished }
      : { ...todoItem }
  )

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setNewTodoItem({ ...newTodoItem as ITodoItem, [name as "title" | "text"]: value})
  }

  const onSaveTodoItem = (): void => {
    if (todoItem === null) {
      dispatch(createTodo(newTodoItem as ITodoItem))
    } else {
      dispatch(updateTodoItem({ todoItem: {
        title: newTodoItem?.title,
        text: newTodoItem?.text,
        id: todoItem.id,
        status: todoItem.status
      } as ITodoItem }))
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
