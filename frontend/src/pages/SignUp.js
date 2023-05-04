import React from 'react'
import Form from 'react-bootstrap/Form';      
import Button from 'react-bootstrap/Button';   
import './SignUp.css'   

export default function SignUp() {
  return (
    <body>
    <div className="SignUpScreen">
    <div className="SignUpContainer">
      <img className="UserImg"src="user_icon.svg" alt="logo" />
      <br/>
      <div className="SignUpForm">
        <h1>Rejestracja</h1>
        <Form className='SignUpForm'>
          <Form.Group>
              <Form.Label className="Label">Email</Form.Label>
              <Form.Control className="InputField" type="email" placeholder="e-mail" />
          </Form.Group>
          <Form.Group>
              <Form.Label className="Label">Nazwa użytkownika</Form.Label>
              <Form.Control className="InputField" type="text" placeholder="nazwa użytkownika" />
          </Form.Group>
          <Form.Group>
              <Form.Label className="Label">Hasło</Form.Label>
              <Form.Control className="InputField" type="password" placeholder="hasło" />
          </Form.Group>
          <Button className="SubmitButton" variant="primary" type="submit">
              Zarejestruj się
          </Button>
        </Form>
      </div>
     
    </div>
    </div>
    </body>
  )
}
