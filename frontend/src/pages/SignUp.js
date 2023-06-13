import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';      
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'   

async function registerUser(credentials){
  return fetch("http://localhost:3080/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpStatus, setSignUpStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await registerUser({
      email,
      username,
      password
    });
    setSignUpStatus(token.message);
    if(token.message == "Sukces"){
      sessionStorage.setItem("isLogged", "true");
      sessionStorage.setItem("user_id", token.user_id);
      navigate('/mojeOgloszenia', { replace: true });
      window.location.reload(false);
    } else {
      sessionStorage.setItem("isLogged", "false");
    }
  }

  return (
    <body>
    <div className="SignUpScreen">
    <div className="SignUpContainer">
      <img className="UserImg"src="user_icon.svg" alt="logo" />
      <br/>
      <div className="SignUpForm">
        <h1>Rejestracja</h1>
        <Form className='SignUpForm' onSubmit={handleSubmit}>
          <Form.Group>
              <Form.Label className="Label">Email</Form.Label>
              <Form.Control className="InputField" type="email" placeholder="e-mail" value={email} onChange={(event) => setEmail(event.target.value)}/>
          </Form.Group>
          <Form.Group>
              <Form.Label className="Label">Nazwa użytkownika</Form.Label>
              <Form.Control className="InputField" type="text" placeholder="nazwa użytkownika" value={username} onChange={(event) => setUsername(event.target.value)}/>
          </Form.Group>
          <Form.Group>
              <Form.Label className="Label">Hasło</Form.Label>
              <Form.Control className="InputField" type="password" placeholder="hasło" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </Form.Group>
          <Button className="SubmitButton" variant="primary" type="submit">
              Zarejestruj się
          </Button>
          <Form.Group>
              <Form.Label className="SignUpMessage">{signUpStatus}</Form.Label>
          </Form.Group>
        </Form>
      </div>
     
    </div>
    </div>
    </body>
  )
}
