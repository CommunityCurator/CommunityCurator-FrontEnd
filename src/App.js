/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Events from './pages/Events'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Groups from './pages/Groups'
import ShowPage from './pages/ShowPage/ShowPage';
import GroupPage from './pages/GroupPage/GroupPage';
// import Comments from "./components/Button/comments/Comments";
import ChooseCategories from './pages/ChooseCategories';



function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/groups' element={<Groups/>} />
        <Route exact path='/groups/:id' element={<GroupPage/>} />
        <Route exact path='/events' element={<Events/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/user/:id' element={<ShowPage/>} />
        <Route exact path='/user/:id/interests' element={<ChooseCategories/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
