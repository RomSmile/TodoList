export enum TodoStatusEnum {
  "notFinished" = 0,
  "finished"
}

export interface ITodoItem {
  id: string
  title: string
  text: string
  status: TodoStatusEnum
}
