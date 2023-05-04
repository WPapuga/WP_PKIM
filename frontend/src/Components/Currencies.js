import React, { useState } from 'react';
import NavDropdown from 'react-bootstrap/Dropdown';
import './Currencies.css'

async function changeCurrency(currency){
    return fetch(`http://localhost:3100/getExchangeRate?currency=${currency}`)
    .then(data => data.json())
  }

function Currencies() {
  async function handleSelect(currency) {
    if(currency == 'PLN'){
        sessionStorage.setItem('currencyCode', currency);
        sessionStorage.setItem('currencyRate', 1);
        window.location.reload(false);
    } else{
        console.log(currency);
        const response = await changeCurrency(currency);
        console.log(response.message);
        if(response.message ==  'Sukces'){
            console.log(currency + response.rate);
            sessionStorage.setItem('currencyCode', currency);
            sessionStorage.setItem('currencyRate', response.rate);
            window.location.reload(false);
        } 
    }
  }

  return (
    <NavDropdown title="Wybierz Walutę" className='DropdownMenu' id="basic-nav-dropdown">
        <NavDropdown.Toggle id="basic-nav-dropdown">Wybierz Walutę</NavDropdown.Toggle>
        <NavDropdown.Menu>
            <NavDropdown.Item onClick={() => handleSelect("PLN")}>PLN</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("EUR")}>EUR</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("USD")}>USD</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("CHF")}>CHF</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("GBP")}>GBP</NavDropdown.Item>
        </NavDropdown.Menu>
    </NavDropdown>
  )
}

export default Currencies