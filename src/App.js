/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Groups from './components/pages/Groups'
import Events from './components/pages/Events'
import LogIn from './components/pages/SignIn'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/groups' element={<Groups/>} />
        <Route exact path='/events' element={<Events/>} />
        <Route exact path='/sign-in' element={<LogIn/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
