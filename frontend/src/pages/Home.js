import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Home.css'


export default function Home() {
  const [testText, setTestText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3080/')
      .then(response => response.text())
      .then(data => setTestText(data));
  }, []);
  
  return (
    <div className="App">
    <header className="App-header">
       <h1>Strona z Ogłoszeniami</h1>
       <h1>Ogłoszenia.pl</h1>
       <img src='advertisement.png' className="App-logo" alt="logo" />
       <h1>Dołącz i handluj</h1>
       <Link to='/rejestracja'>
          Dołącz Teraz
       </Link>
    </header>
    <body>
      <div className='WelcomePageContainer'>
        <div className='LeftContainer'>
          <div className='ImageContainer'>
            <img className='WelcomePageImage' src='country-currencies.png'></img>
          </div>
          <br/>
          <h2>Przeglądaj oferty w różnych walutach</h2>
        </div>
        <div className='CenterContainer'>
          <div className='ImageContainer'>
            <img className='WelcomePageImage' src='megaphone.png'></img>
          </div>
          <br/>
          <h2>Wystawiaj swoje własne ogłoszenia handlowe</h2>
        </div>
        <div className='RightContainer'>
          <div className='ImageContainer'>
            <img className='WelcomePageImage' src='trade.png'></img>
          </div>
          <br/>
          <h2>Handluj z innymi ludźmi</h2>
        </div>
      </div>
      <br/>
    </body>
    </div>
  )
}

