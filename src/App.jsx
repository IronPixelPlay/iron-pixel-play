import { useState } from 'react'
import './App.css'
import GameDetailsPage from './pages/GameDetails'
import GameListPage from './pages/GameListPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SingupPage'
import NavBar from './components/Navbar'
import CreateGame from "./pages/CreateGame"
import { Route, Routes } from 'react-router-dom'
import IsPrivate from './components/IsPrivate'

function App() {
  
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GameListPage />} />
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        <Route path='/games/create' element={<IsPrivate> <CreateGame/> </IsPrivate>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App
