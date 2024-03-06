import { FC, ReactNode } from "react"
import { Button, Switch } from "antd"
import { EditOutlined } from '@ant-design/icons';
import { ITodoItemComponent } from "./types.ts"
import { TodoStatusEnum } from "@/types.ts"
import { useAppDispatch } from "@/hooks/redux.ts"
import { changeTodoStatus } from "@/store/todoSlice"
import { TodoItemViewMode } from "@/components/TodoList/types.ts"
import './style.scss'

const TodoItem: FC<ITodoItemComponent> = ({ title, status, index, setOpenModal}): ReactNode => {
  const dispatch = useAppDispatch()

  const changeStatus = (): void => {
    dispatch(changeTodoStatus({
      index,
      status: status === TodoStatusEnum.finished ? TodoStatusEnum.notFinished : TodoStatusEnum.finished
    }))
  }

  const onReadItemModal = (): void => {
    setOpenModal({
      todoItemIndex: index,
      mode: TodoItemViewMode.read
    })
  }

  const onEditItemModal = (): void => {
    setOpenModal({
      todoItemIndex: index,
      mode: TodoItemViewMode.edit
    })
  }

  return (
    <li className="todo-list-item">
      <p onClick={onReadItemModal}>{title}</p>
      <div className="todo-list-item__buttons-container">
        <Button
          onClick={onEditItemModal}
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          size="small"
        />
        <Switch
          checkedChildren="finished"
          unCheckedChildren="progress"
          checked={TodoStatusEnum['finished'] === status}
          onClick={changeStatus}
        />
      </div>
    </li>
  )
}

export default TodoItem
