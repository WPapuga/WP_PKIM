import React from 'react'
import './MyAds.css'

function MyAds() {
  console.log(sessionStorage.getItem('isLogged'));
  return (
    <div>
      <p>Twoje ogłoszenia</p>
    </div>
  )
}

export default MyAds