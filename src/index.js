import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import mystore from './app/store';
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={mystore}>
  <BrowserRouter>
<App />
  </BrowserRouter>
</Provider>
);

