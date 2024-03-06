import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./store"
import { ToastContainer } from "react-toastify"
import App from './App.tsx'
import './index.scss'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)
