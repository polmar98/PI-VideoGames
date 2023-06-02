import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Landing from './views/Landing';
import Form from './views/Form';
import About from './views/About';
import Details from './components/Details/Details';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path='/Landing' element={<Landing/>} />
          <Route path="/Form" element={<Form/>} />
          <Route path="/Details/:id" element={<Details/>} />
       </Routes>
    </div>
  );
}

export default App;
