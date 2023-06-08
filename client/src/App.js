import React from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Landing from './views/Landing';
import Form from './components/Form/Form';
import About from './views/About';
import Details from './components/Details/Details';

function App() {
  const location  = useLocation();
  const onSearch = ()=>{};

  return (
    <div className="App">
          {(location.pathname !== '/home') && (
             <Navbar onSearch={onSearch} />
          )}

      <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Form" element={<Form/>} />
          <Route path="/Details/:id" element={<Details/>} />
       </Routes>
    </div>
  );
}

export default App;
