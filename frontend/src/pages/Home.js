import React, { useState, useEffect } from 'react'
import logo from '../logo.svg';


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
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <p>Test serwera {testText}</p>
    </header>
    <body className="App-body">
      <div>
        Strona z Ogłoszeniami
        <br/>
        Dołącz i handluj
      </div>
    </body>
    </div>
  )
}

