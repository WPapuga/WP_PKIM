import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [testText, setTestText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3080/test')
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
    </div>
  );
}

export default App;
