import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center justify-start'>
      <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/>: <Navigate to={"/"}/>}/>
      </Routes>
    </div>
  )
}

export default App
