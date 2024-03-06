import {useAppSelector} from "@/hooks/redux.ts"
import {ReactNode, useState} from "react"
import {ModalStateType, TodoItemViewMode} from "@/components/TodoList/types.ts"
import {TodoModal} from "@/components"
import TodoItem from "./components/TodoItem"
import {Button} from "antd"
import './style.scss'


const TodoList = (): ReactNode => {
  const [openModal, setOpenModal] = useState<ModalStateType>(null)
  const { todos } = useAppSelector((state) => state.todo)

  const onCloseModal = (): void => {
    setOpenModal(null)
  }

  const onAddNewItem = () => {
    setOpenModal({ mode: TodoItemViewMode.edit, todoItemIndex: -1})
  }

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo, index) =>
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
          todoItem={openModal.todoItemIndex < 0 ? null : todos[openModal.todoItemIndex]}
          onCloseModal={onCloseModal}
          index={openModal.todoItemIndex}
        />
      }
    </>
  )
}

export default TodoList