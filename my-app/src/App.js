import React from 'react';
import './Styles/App.css'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar.jsx';
import AppRouter from './components/UI/AppRouter.jsx';
import { AuthContext } from './context/index.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)


  useEffect (() =>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>


  )
}

export default App;
