import {useAppSelector} from "@/hooks/redux.ts"
import {ReactNode, useMemo, useState} from "react"
import {ModalStateType, TodoItemViewMode} from "@/components/TodoList/types.ts"
import {TodoStatusEnum} from "@/types.ts"
import {TodoModal} from "@/components"
import TodoItem from "./components/TodoItem"
import {Button, Radio, RadioChangeEvent} from "antd"
import './style.scss'


const TodoList = (): ReactNode => {
  const [openModal, setOpenModal] = useState<ModalStateType>(null)
  const [filterValue, setFilterValue] = useState<TodoStatusEnum | null>(null)
  const { todos } = useAppSelector((state) => state.todo)

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
      return todos.filter((todoItem) => todoItem.status === filterValue)
    }
  }, [filterValue, todos])

  return (
    <>
      {Boolean(todos.length) &&
        <Radio.Group onChange={onChangeFilter} defaultValue={null}>
          <Radio.Button value={null}>All</Radio.Button>
          <Radio.Button value={TodoStatusEnum.notFinished}>Process</Radio.Button>
          <Radio.Button value={TodoStatusEnum.finished}>Finished</Radio.Button>
        </Radio.Group>
      }
      <ul className="todo-list">
        {outputTodos.map((todo, index) =>
          <TodoItem key={todo.id} index={index} {...todo} setOpenModal={setOpenModal} />
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