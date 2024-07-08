export enum TodoStatusEnum {
  "notFinished" = 0,
  "finished"
}

export interface ITodoItem {
  id: number
  title: string
  text: string
  status: TodoStatusEnum
}
