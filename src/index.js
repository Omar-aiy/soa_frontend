import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsOverview from './components/views/ProductsOverview';
import Cart from './components/views/Cart';
import Dashboard from './components/views/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/products" exact element={<ProductsOverview/>} />
      <Route path="/dashboard" exact element={<Dashboard/>} />
      <Route path="/cart" exact element={<Cart/>} />
      <Route path="*" element={<ProductsOverview/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
