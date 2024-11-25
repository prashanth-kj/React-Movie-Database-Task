import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Home() {

  let [movietitle,setMovieTitle]=useState('')
  let [movies,setMovies]=useState([])
  let [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate(' ')
  const API_KEY = '536a812a';
  const BASE_URL = 'https://www.omdbapi.com/';

  let getMovies=async()=>{
    if (movietitle.length < 3) {
      setErrorMessage('Please enter at least 3 characters to search.');
      setMovies([]);
      return;
    }

    try {
      let res = await axios.get(`${BASE_URL}?s=${movietitle}&apikey=${API_KEY}`);
      if (res.data.Response === "True") {
        setMovies(res.data.Search); 
        setErrorMessage(''); 
      } else {
        setMovies([]); 
        setErrorMessage(res.data.Error); 
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  }
  
  let handleViewDetails=(imdbID)=>{
       navigate('/moviedetails',{
        state:{
            API_KEY,
            BASE_URL,
            imdbID
        }
       })
  }

  return (
  <>
    <div className='container'>
        <div>
          <Form.Control
            type="text"
            placeholder="search your movie title here..."
            aria-label="search your movie title here..."
            onChange={(e)=>setMovieTitle(e.target.value)}
          />
          
          <Button variant="success" className='mt-4' onClick={()=>getMovies()}>Search</Button>

          </div>

          <div className="row justify-content-center">

          {errorMessage && (
            <div className="text-center mt-5">
              <h4>{errorMessage}</h4>
            </div>
          )}

          {movies.map((movie) => (
            <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
              <Card className="shadow rounded-4 h-100 p-3 card-hover">
                <Card.Img variant="top" src={movie.Poster} height="200px" />
                <Card.Body className='d-flex flex-column justify-content-between '>
                   <div className='mb-3'>
                    <Card.Title>Title: {movie.Title}</Card.Title>
                    <Card.Text>Year: {movie.Year}</Card.Text>
                   </div>
                  <Button
                    variant="secondary"
                    className="w-100 mt-3"
                    onClick={() => handleViewDetails(movie.imdbID)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}

        </div>

            
      
    </div>



  </>
  )
}

export default Home