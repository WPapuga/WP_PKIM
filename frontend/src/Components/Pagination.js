import React from 'react'

function Pagination({ adsPerPage, totalAds}) {
    const pageNumbers = [];

    for(var i = 1; i <= Math.ceil(totalAds / adsPerPage); i++){
        pageNumbers.push(i);
    }
    console.log(adsPerPage, totalAds, pageNumbers);

    return (
        pageNumbers.map(number => {
            console.log(number);
            <p>{number}</p>
        })
    )
}

export default Pagination