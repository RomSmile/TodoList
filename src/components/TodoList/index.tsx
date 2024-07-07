import {useAppSelector, useAppDispatch} from "@/hooks/redux"
import {FC, useEffect, useMemo, useState} from "react"
import {ModalStateType, TodoItemViewMode} from "@/components/TodoList/types"
import {TodoStatusEnum} from "@/types"
import {TodoModal} from "@/components"
import TodoItem from "./components/TodoItem"
import {Button, Radio, RadioChangeEvent} from "antd"
import { RootState } from "../../store"
import { ITodoItem } from "@/types"
import './style.scss'
import { getTodos } from "@/store/todoSlice/actions"

const TodoList: FC = () => {
  const [openModal, setOpenModal] = useState<ModalStateType>(null)
  const [filterValue, setFilterValue] = useState<TodoStatusEnum | null>(null)
  const { todos, loading, error } = useAppSelector((state: RootState) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos({}));
  }, [])

  const onCloseModal = (): void => {
    setOpenModal(null)
  }

  const onAddNewItem = (): void => {
    setOpenModal({ mode: TodoItemViewMode.edit, todoItemIndex: -1})
  }

  const onChangeFilter = (e: RadioChangeEvent): void => {
    setFilterValue(e.target.value)
  }

  const outputTodos = useMemo(() => {
    if (filterValue === null) {
      return todos
    } else {
      return todos.filter((todoItem: ITodoItem) => todoItem.status === filterValue)
    }
  }, [filterValue, todos])

  return (
    loading ? <>Loading ...</> : <>
      {Boolean(todos.length) &&
        <Radio.Group onChange={onChangeFilter} defaultValue={null}>
          <Radio.Button value={null}>All</Radio.Button>
          <Radio.Button value={TodoStatusEnum.notFinished}>Process</Radio.Button>
          <Radio.Button value={TodoStatusEnum.finished}>Finished</Radio.Button>
        </Radio.Group>
      }
      <ul className="todo-list">
        {Boolean(todos.length) && (
          outputTodos.map((todo: ITodoItem, index: number) =>
            <TodoItem key={todo.id} index={index} {...todo} setOpenModal={setOpenModal} />
          )
        )}

        {!todos.length &&
          <h2>
            No todo Items yet
          </h2>
        }
      </ul>
      <Button color="primiry" onClick={onAddNewItem}>add new todoItem</Button>
      {openModal !== null &&
        <TodoModal
          mode={openModal.mode}
          todoItem={openModal.todoItemIndex < 0 ? null : outputTodos[openModal.todoItemIndex]}
          onCloseModal={onCloseModal}
        />
      }
    </>
  )
}

export default TodoList