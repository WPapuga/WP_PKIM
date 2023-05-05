import React from 'react';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Currencies from './Currencies'

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <div className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
      </div>
    )
}


function Navbar() {
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem('isLogged'));
  console.log(sessionStorage.getItem('currencyRate') == null ? 1 : sessionStorage.getItem('currencyRate'));
  useEffect(() => {
    setIsLogged(sessionStorage.getItem('isLogged'));
  }, []);

  if(isLogged == "true"){
    return (
      <div className="Navbar">
        <div className="NavLeftSide">
            <img src="advertisement.png" alt="logo"/>
            <Link>Ogłoszenia.pl</Link>
        </div>
        <div className="NavLinks">
            <CustomLink to="/">Strona Główna</CustomLink>
            <CustomLink to="/ogloszenia">Ogłoszenia</CustomLink>
            <div className='DropdownCurrencies'><Currencies></Currencies></div>
            <Link>{sessionStorage.getItem('currencyCode')}</Link>
        </div>
        <div className="NavSigning">
          <CustomLink to="/tworzenie">Stwórz Ogłoszenie</CustomLink>
          <CustomLink to="/mojeOgloszenia">Moje Ogłoszenia</CustomLink>
          <CustomLink to="/wylogowanie">
            <Button className="SignOutButton">Wyloguj się</Button>
          </CustomLink>
        </div>
      </div>
    )
  } else {
    return (
      <div className="Navbar">
        <div className="NavLeftSide">
            <img src="advertisement.png" alt="logo"/>
            <Link>Ogłoszenia.pl</Link>
        </div>
        <div className="NavLinks">
            <CustomLink to="/">Strona Główna</CustomLink>
            <CustomLink to="/ogloszenia">Ogłoszenia</CustomLink>
            <div className='DropdownCurrencies'><Currencies></Currencies></div>
            <Link>{sessionStorage.getItem('currencyCode')}</Link>
        </div>
        <div className="NavSigning">
          <CustomLink to="/logowanie">Zaloguj się</CustomLink>
          <CustomLink to="/rejestracja">
            <Button className="SignUpButton">Zarejestruj się</Button>
          </CustomLink>
        </div>
      </div>
    )
  }
}



export default Navbar