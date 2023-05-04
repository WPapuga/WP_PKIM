import { Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Ads from './pages/Ads'
import Currencies from './pages/Currencies'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PostAd from './pages/PostAd'
import MyAds from './pages/MyAds'
import LogOut from './pages/LogOut'
import Footer from './Components/Footer'
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/ogloszenia" element={ <Ads/> } />
        <Route path="/waluty" element={ <Currencies/> } />
        <Route path="/logowanie" element={ <SignIn/> } />
        <Route path="/rejestracja" element={ <SignUp/> } />
        <Route path="/tworzenie" element={ <PostAd/> } />
        <Route path="/mojeOgloszenia" element={ <MyAds/> } />
        <Route path="/wylogowanie" element={ <LogOut/> } />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
