import React from 'react'
import './MyAdsList.css'

function MyAdsList({ ads, loading }) {
  if(loading){
    return <h2> Ładowanie... </h2>
  }

  return (
    <div className="AdContainer">
      {ads.map((item) => (
        <div className='Ad' key={item.id}>
          <div className='AdHeader'>
            <div className='LeftSideHeader'></div>
            <div className='MiddleHeader'><h1>{item.username}</h1></div>
            <div className='RightSideHeader'><img src="delete2.png"/></div>
          </div>
          <p>Treść = {item.content}</p>
          <p>Cena = {item.price} {sessionStorage.getItem('currency')}</p>
        </div>
      ))}
    </div>
  )
}

export default MyAdsList