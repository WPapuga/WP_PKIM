import React, { useState, useEffect } from 'react'
import MyAdsList from '../Components/MyAdsList'
import './MyAds.css'
import ReactPaginate from 'react-paginate';

function MyAds() {
  console.log(sessionStorage.getItem('isLogged'));
  console.log(sessionStorage.getItem('user_id'));
  const [adsList, setAdsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    console.log(sessionStorage.getItem('user_id'));
    fetch(`http://localhost:3080/advertsCustom?user_id=${sessionStorage.getItem('user_id')}`)
    .then(response => response.json())
    .then(data => {
      setAdsList(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = adsList.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = ({selected}) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="App">
    <body className="App-body">
        <h1>Ogłoszenia</h1>
        <MyAdsList ads={currentAds} loading={loading}/>
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
    </body>
    </div>
  )
}

export default MyAds