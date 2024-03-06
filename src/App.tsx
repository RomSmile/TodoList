import { ReactNode } from "react"
import { TodoList, Header } from "@/components"
import './App.scss'

function App(): ReactNode {
  return (
    <>
      <Header />
      <section className="main">
        <TodoList />
      </section>
    </>
  )
}

export default App
