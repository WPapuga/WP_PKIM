import React from 'react'
import './AdsList.css'

function AdsList({ ads, loading }) {
  if(loading){
    return <h2> Ładowanie... </h2>
  }

  return (
    <div className="AdContainer">
      {ads.map((item) => (
        <div className='Ad' key={item.id}>
          <h1>{item.username}</h1>
          <p>Treść = {item.content}</p>
          <p>Cena = {item.price * (sessionStorage.getItem('currencyRate') == null ? 1 : sessionStorage.getItem('currencyRate'))} {(sessionStorage.getItem('currencyCode') == null ? "PLN" : sessionStorage.getItem('currencyCode'))}</p>
        </div>
      ))}
    </div>
  )
}

export default AdsList