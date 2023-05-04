import React from 'react'
import { useState } from 'react';
import './MyAdsList.css'

async function deleteAd(data){
    return fetch("http://localhost:3080/advertDelete", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(data => data.json())
  }

function MyAdsList({ ads, loading }) {
  const [deleteStatus, setDeleteStatus] = useState('');
  const [deleteError, setDeleteError] = useState('');

  if(loading){
    return <h2> Ładowanie... </h2>
  }

  async function handleDelete(id){
    const token = await deleteAd({
      id
    });
    if(token.message == "Sukces") {
        setDeleteStatus(token.message);
    } else {
        setDeleteError(token.message);
    }
    window.location.reload(false);
  }

  return (
    <><p className='ErrorMessage'>{deleteError}</p>
    <p className='StatusMessage'>{deleteStatus}</p>
    <div className="AdContainer">
          {ads.map((item) => (
              <div className='Ad' key={item.id}>
                  <div className='AdHeader'>
                      <div className='LeftSideHeader'></div>
                      <div className='MiddleHeader'><h1>{item.username}</h1></div>
                      <div className='RightSideHeader'><img src="delete2.png" onClick={() => handleDelete(item.id)} /></div>
                  </div>
                  <p>Treść = {item.content}</p>
                  <p>Cena = {item.price * (sessionStorage.getItem('currencyRate') == null ? 1 : sessionStorage.getItem('currencyRate'))} {(sessionStorage.getItem('currencyCode') == null ? "PLN" : sessionStorage.getItem('currencyCode'))}</p>
              </div>
          ))}
      </div></>
  )
}

export default MyAdsList