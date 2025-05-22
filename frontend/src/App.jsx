import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {
  let authUser = null;
  return (
    <div className='flex flex-col items-center justify-start'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/>: <Navigate to={"/"}/>}/>
      </Routes>
    </div>
  )
}

export default App
