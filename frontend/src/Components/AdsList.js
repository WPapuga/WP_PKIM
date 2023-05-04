import React from 'react'

function AdsList({ ads, loading }) {
  if(loading){
    return <h2> Ładowanie... </h2>
  }

  return (
    ads.map((item) => (
      <div key={item.id}>
        <h1>{item.username}</h1>
        <p>Treść = {item.content}</p>
        <p>Cena = {item.price}</p>
      </div>
    ))
  )
}

export default AdsList