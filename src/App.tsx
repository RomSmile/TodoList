import { TodoList, Header } from "@/components"
import './App.scss'

function App() {
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
