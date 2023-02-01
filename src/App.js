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
//import Groups from './components/pages/Groups'
import Events from './components/pages/Events'
import Login from './components/pages/Login'
import Groups from './components/pages/Groups'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/groups' element={<Groups/>} />
        <Route exact path='/events' element={<Events/>} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
