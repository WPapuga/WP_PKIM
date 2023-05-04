import React, { useState, useEffect } from 'react'
import AdsList from '../Components/AdsList'
import Pagination from '../Components/Pagination'


function Ads() {
  const [adsList, setAdsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(1);

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

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = adsList.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="App">
    <body className="App-body">
      <div>
        Ads
        <AdsList ads={currentAds} loading={loading}/>
        <p>cos tam</p>
        <Pagination adsPerPage={adsPerPage} totalAds={adsList.length}/>
        <p>drugie cos tam</p>
      </div>
    </body>
    </div>
  )
}

export default Ads