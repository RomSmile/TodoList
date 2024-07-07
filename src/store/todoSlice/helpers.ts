import {ITodoItem} from "@/types";
import {toast} from "react-toastify";

export function validateTodoItem(todoItem: ITodoItem): boolean {
  const validateTitle = todoItem.title.length > 25
  const validateText = todoItem.text.length > 50

  const validateTodoItem = validateText || validateTitle

  if (validateTodoItem) {
    toast(`Your task ${validateTitle ? 'title' : 'text'} is too big`, {
      type: "error",
    })
    return false
  }

  return true
}