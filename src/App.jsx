import React from 'react'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Rakhis from './Components/Rakhis/Rakhis';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/rakhis' element={<Rakhis/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App