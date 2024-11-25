import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { CiStar } from "react-icons/ci";
import { AiFillStar } from 'react-icons/ai';
function Favorites() {

  let [favorites,setFavorites]=useState([])
  let [isfavorite,setIsfavorite]=useState(true)

let getData=()=>{
     let favoriteMovies= JSON.parse(sessionStorage.getItem('favorites',favorites)) || []
     setFavorites(favoriteMovies)
}
  
 const togglefavorite = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(()=>{
     getData()
  },[])
  return (

  <div className='container'>
  <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
    {
      favorites.length > 0 ? (
        favorites.map((favorite) => (
          <div key={favorite.imdbID} className="col mb-3">
            <Card style={{ width: '100%', height: '100%' }} className='p-3 shadow rounded-4 card-hover'>
              <Card.Img variant="top" src={favorite.Poster} height={'240px'} />
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <Card.Title className='mb-3'>Title: {favorite.Title}</Card.Title>
                  </div>
                  <div onClick={() => togglefavorite(favorite.imdbID)}>
                    {
                      isfavorite ? (
                        <AiFillStar className='mb-2' size={'25px'} color='blue' />
                      ) : (
                        <CiStar className='mb-2' size={'25px'} />
                      )
                    }
                  </div>
                </div>
                <Card.Text>Year: {favorite.Year}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div className="text-center mt-5">
          <h4>No favorites added yet!</h4>
        </div>
      )
    }
  </div>
</div>

  )
}

export default Favorites