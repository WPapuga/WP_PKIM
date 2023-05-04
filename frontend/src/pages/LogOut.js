import React from 'react'
import './LogOut.css'

function LogOut() {
  if(sessionStorage.getItem('isLogged') == "true"){
    sessionStorage.setItem('isLogged', "false");
    window.location.reload(false);
  }
  return (
    <div>
        <p>Wylogowano pomyślnie</p>
    </div>
  )
}

export default LogOut