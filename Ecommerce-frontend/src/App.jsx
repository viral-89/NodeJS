import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import JoinUsPage from './pages/JoinUsPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import EditProfile from './pages/EditProfile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/joinus' element={<JoinUsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App