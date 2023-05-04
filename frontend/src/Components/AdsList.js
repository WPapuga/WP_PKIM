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
          <p>Cena = {item.price} {sessionStorage.getItem('currency')}</p>
        </div>
      ))}
    </div>
  )
}

export default AdsList