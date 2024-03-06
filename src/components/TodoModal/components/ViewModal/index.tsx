import { FC } from "react"
import { Modal } from "antd"
import { ITodoModal } from "@/components/TodoModal/types.ts"

const ViewModal: FC<Omit<ITodoModal, 'mode' | 'index'>> = ({todoItem, onCloseModal}) => {
  return (
    <Modal
      title={todoItem?.title}
      open={true}
      onCancel={onCloseModal}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <p>{todoItem?.text}</p>
    </Modal>
  )
}

export default ViewModal