import React, { useState, useEffect } from 'react'
import './Ads.css'
import ReactPaginate from 'react-paginate';
import { Form, Button } from 'react-bootstrap';


async function postComment(commentData){
  return fetch("http://localhost:3080/postComment", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  }).then(data => data.json())
}

function Ads() {
  const [adsList, setAdsList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(1);
  const [content, setContent] = useState('');
  const [ID, setID] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);



  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3080/adverts')
      .then(response => response.json())
      .then(data => {
        setAdsList(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCommentAdded(false)
    setCommentsLoading(true)
    fetch('http://localhost:3080/comments')
      .then(response => response.json())
      .then(data => {
        setCommentsList(data);
        console.log(data);
        setCommentsLoading(false);
      });
  }, [commentAdded]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = adsList.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = ({selected}) => {
    setCurrentPage(selected + 1);
  };

  const handleSubmit = async e => {
    if(content === ''){
      alert('Wpisz treść komentarza');
      return;
    }
    var data = {
      user_id: sessionStorage.getItem('user_id'),
      ad_id: ID,
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      content: content
    }
    e.preventDefault();
    fetch("http://localhost:3080/postComment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(setCommentAdded(true))
  }

  if(loading){
    return <h2> Ładowanie... </h2>
  }
  return (
    <body className="App-body">
    <div className="App">
        <h1>Ogłoszenia</h1>
        <div className="AdContainer">
          {currentAds.map((item) => (
            <div className='Ad' key={item.id}>
              <h1>{item.username}</h1>
              <p>Treść = {item.content}</p>
              <p>Cena = {item.price / (sessionStorage.getItem('currencyRate') == null ? 1 : sessionStorage.getItem('currencyRate'))} {(sessionStorage.getItem('currencyCode') == null ? "PLN" : sessionStorage.getItem('currencyCode'))}</p>
              <div className='CommentsContainer'>
                <div className='CommentHeaderContainer'><p>Komentarze</p></div>
                {commentsList.map((comment) => {
                  if (comment.ad_id === item.id) {
                    return  <div className='Comment'>
                              <div className='CommenHeader'>
                                <div className='CommentHeaderLeft'><p>Użytkownik: {comment.username}</p></div>
                                <div className='CommentHeaderRight'><p>Data: {new Date(comment.date).toLocaleString('en-US', {timeZone: 'UTC',
                                                                      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',second: '2-digit',})}
                                                                    </p>
                                </div>
                              </div>
                              <div className='CommentContent'>
                                <p>{comment.content}</p>
                              </div>
                            </div>
                  } else {
                    return <div></div>;
                  }
                })}
                {commentsList.every((comment) => comment.ad_id !== item.id) && <p>Brak Komentarzy</p>}
                {sessionStorage.getItem('isLogged') == "true" ? (
                <Form className='LoginForm' onSubmit={handleSubmit}>
                  <Form.Group controlId="content">
                    <Form.Label className='InputLabel'>Napisz komentarz</Form.Label>
                    <Form.Control className="InputField" type="text" placeholder="Wpisz komentarz" value={content} onChange={(event) => setContent(event.target.value)}/>
                    <Button className='InputButton' variant="primary" type="submit" value={item.id} onClick={(event) => setID(event.target.value)} >
                      Dodaj komentarz
                    </Button>
                  </Form.Group>
                </Form>
                ) : <p>Zaloguj się aby dodać komentarz</p>
                }
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(adsList.length / adsPerPage)}
                  previousLabel={'Poprz'}
                  nextLabel={'Nast'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
          />
    </div>
    </body>
  )
}

export default Ads