import React from 'react'
import Form from 'react-bootstrap/Form';      
import Button from 'react-bootstrap/Button';   
import './SignIn.css'   


function SignIn() {
  return (
    <body>
    <div className="LoginScreen">
    <div className="LoginContainer">
      <img className="UserImg"src="user_icon.svg" alt="logo" />
      <br/>
      <div className="LoginForm">
        <h1>Logowanie</h1>
        <Form className='LoginForm'>
          <Form.Group>
              <Form.Label className="Label">Email</Form.Label>
              <Form.Control className="InputField" type="email" placeholder="e-mail" />
          </Form.Group>
          <Form.Group>
              <Form.Label className="Label">Hasło</Form.Label>
              <Form.Control className="InputField" type="password" placeholder="hasło" />
          </Form.Group>
          <Button className="SubmitButton" variant="primary" type="submit">
              Zaloguj się
          </Button>
        </Form>
      </div>
     
    </div>
    </div>
    </body>
  )
}

export default SignIn