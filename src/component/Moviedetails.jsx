import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { CiStar } from "react-icons/ci";
import { AiFillStar } from 'react-icons/ai';
function Moviedetails() {

   let [moviedetail,setMovieDetail]=useState('')
   let [isfavorite,setIsfavorite]=useState(false)
  let location =useLocation();
  let navigate=useNavigate();
  let {API_KEY,BASE_URL,imdbID}=location.state || {}
   
   let getdata=async()=>{
       let res= await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`)
       setMovieDetail(res.data)

   } 
 let togglefavorite=(imdbID,moviedetail)=>{
      let favorites=JSON.parse(sessionStorage.getItem('favorites')) || []

      if(isfavorite){
          const updatedFavorites = favorites.filter((movie)=>movie.filter !== imdbID)
          sessionStorage.setItem('favorites',JSON.stringify(updatedFavorites))
      }else{
         let exists= favorites.some((movie)=>movie.imdbID==imdbID)
         if(!exists){
          favorites.push(moviedetail)
         }
        
         sessionStorage.setItem('favorites',JSON.stringify(favorites))
      }
     
    setIsfavorite(!isfavorite)
    
 }
  useEffect(()=>{
     if(API_KEY && BASE_URL && imdbID){
       getdata()
     }
  },[])
  return (
    <div className='container' >
      <div className='d-flex justify-content-between align-items-center' >
              <div className='container-fluid '  style={{width:'600px'}}>
                    <Card className='shadow p-3 mb-4 rounded-4'>
                      <Card.Img variant="top" src={moviedetail.Poster} height={'400px'}/>
                      <Card.Body>
                      <div className='d-flex justify-content-between align-items-center'>
                          <div> 
                            <Card.Title className='mb-3'><strong>Title:</strong> {moviedetail.Title}</Card.Title>
                          </div>
                          <div onClick={()=>togglefavorite(moviedetail.imdbID,moviedetail)}>
                           {
                            isfavorite?(
                               <AiFillStar className='mb-2' size={'25px'} color='blue'/>
                            ):
                            (
                              <CiStar  className='mb-2' size={'25px'} />
                            )
                           }
                          </div>
                      </div>

                        <Card.Text><strong>Year:</strong> {moviedetail.Year} </Card.Text>
                        <Card.Text><strong>Plot:</strong> {moviedetail.Plot} </Card.Text>
                        <Card.Text><strong>RunTime:</strong> {moviedetail.Runtime} </Card.Text>
                        <Card.Text><strong>Genre:</strong>  {moviedetail.Genre} </Card.Text>
                        <Card.Text><strong>Director:</strong>  {moviedetail.Director} </Card.Text>
                        
                      </Card.Body>
                    </Card>
              </div>
          </div>
    
    </div>
  )
}

export default Moviedetails