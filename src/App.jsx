import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./component/Home"
import Moviedetails from "./component/Moviedetails"
import Favorites from "./component/Favorites"
import Header from "./component/Header"


function App() {
 
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/favorites' element={<><Header/><Favorites/></>} />
      <Route path='/moviedetails' element={<><Header/><Moviedetails/></>} /> 
      <Route path='/' element={<><Header/><Home/></>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
