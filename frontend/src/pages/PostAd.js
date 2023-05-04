import React from 'react'
import './PostAd.css'
import Form from 'react-bootstrap/Form';      
import Button from 'react-bootstrap/Button';  
import { useState } from 'react';

async function postAd(data){
  console.log(data);
  return fetch("http://localhost:3080/advertCreate", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
}

function PostAd() {
  const [postMessage, setPostMessage] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [user_id, setUser_id] = useState(sessionStorage.getItem('user_id'));

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await postAd({
      content,
      price,
      user_id
    });
    setPostMessage(token.message);
    // window.location.reload(false);
  }

  return (
    <body className="App-body">
    <div className="PostAdScreen">
      <div className='SubmitContainer'>
        <h1>Dodaj ogłoszenie</h1>
        <Form className='SubmitForm' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='Label'>Treść Ogłoszenia</Form.Label>
            <Form.Control className='TextArea' as="textarea" placeholder="treść ogłoszenia" value={content} onChange={(event) => setContent(event.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className='Label'>Cena</Form.Label>
            <Form.Control className='InputNumber' type='number' placeholder="cena" value={price} onChange={(event) => setPrice(event.target.value)}></Form.Control>
          </Form.Group>
          <Button className='SubmitButton' variant="primary" type="submit">Dodaj ogłoszenie</Button>
          <Form.Group>
              <Form.Label className="PostAdMessage">{postMessage}</Form.Label>
          </Form.Group>
        </Form>
      </div>
    </div>
    </body>
  )
}

export default PostAd