import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar'; 
import Home from './components/Home';
import Menu1 from './components/Menu1';
import Admin from './components/Admin';
import CartPage from './components/CartPage';
import Success from './components/Success';
import Failure from './components/Failure';
import Myorders from './components/Myorders';
import './App.css';

const App = () => {
  return (
    <div className="app-background">
    <BrowserRouter>
      <ResponsiveAppBar /> 

      <Routes>
        <Route path="/" element={<Home />} />           
        <Route path="/menu" element={<Menu1 />} />        
        <Route path="/admin" element={<Admin />} />        
        <Route path="/cartpage" element={<CartPage />} />  
        <Route path="/success" element={<Success />} />  
        <Route path="/failure" element={<Failure />} />
        <Route path="/myorders" element={<Myorders />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
