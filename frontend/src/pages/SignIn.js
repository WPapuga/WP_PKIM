import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';      
import Button from 'react-bootstrap/Button';  
import { useNavigate } from 'react-router-dom';
import './SignIn.css'   

async function loginUser(credentials){
  return fetch("http://localhost:3080/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');



  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setLoginStatus(token.message);
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
    <div className="LoginScreen">
    <div className="LoginContainer">
      <img className="UserImg"src="user_icon.svg" alt="logo" />
      <br/>
      <div className="LoginForm">
        <h1>Logowanie</h1>
        <Form className='LoginForm' onSubmit={handleSubmit}>
          <Form.Group>
              <Form.Label className="Label">Email</Form.Label>
              <Form.Control className="InputField" type="email" placeholder="e-mail" value={email} onChange={(event) => setEmail(event.target.value)}/>
          </Form.Group>
          <Form.Group>
              <Form.Label className="Label">Hasło</Form.Label>
              <Form.Control className="InputField" type="password" placeholder="hasło" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </Form.Group>
          <Button className="SubmitButton" variant="primary" type="submit">
              Zaloguj się
          </Button>
          <Form.Group>
              <Form.Label className="LoginMessage">{loginStatus}</Form.Label>
          </Form.Group>
        </Form>
      </div>
    </div>
    </div>
    </body>
  )
}

export default SignIn