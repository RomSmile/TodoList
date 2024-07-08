import { FC, ReactNode } from "react"
import { Button, Switch } from "antd"
import { EditOutlined } from '@ant-design/icons'
import { ITodoItemComponent } from "./types"
import { TodoStatusEnum } from "@/types"
import { useAppDispatch } from "@/hooks/redux"
import { TodoItemViewMode } from "@/components/TodoList/types"
import './style.scss'
import { updateTodoItem } from "@/store/todoSlice/actions"

const TodoItem: FC<ITodoItemComponent> = ({ title, text, status, index, setOpenModal, id}) => {
  const dispatch = useAppDispatch()

  const changeStatus = (): void => {
    dispatch(updateTodoItem({
      todoItem: {
        title,
        text,
        id,
        status: status === TodoStatusEnum.finished ? TodoStatusEnum.notFinished : TodoStatusEnum.finished
      }
    }))
  }

  const onReadItemModal = (): void => {
    setOpenModal({
      todoItemId: id,
      mode: TodoItemViewMode.read
    })
  }

  const onEditItemModal = (): void => {
    setOpenModal({
      todoItemId: id,
      mode: TodoItemViewMode.edit
    })
  }

  return (
    <li className="todo-list-item">
      <p onClick={() => onReadItemModal()}>{title}</p>
      <div className="todo-list-item__buttons-container">
        <Button
          onClick={() => onEditItemModal()}
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          size="small"
        />
        <Switch
          checkedChildren="finished"
          unCheckedChildren="progress"
          checked={TodoStatusEnum['finished'] === status}
          onClick={() => changeStatus()}
        />
      </div>
    </li>
  )
}

export default TodoItem
