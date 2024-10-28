import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from "../src/routers";
import { GoogleAuthProvider } from "./containers/Auth/resources/googleAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return(
    <div className='container-fluid'>
      <AuthContextProvider>
        <RouterProvider router={router}/>
      </AuthContextProvider>
        
    </div>
  )
}

export default App
