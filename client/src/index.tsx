import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/Layout/style.css'
import App from './app/Layout/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { StoreProvider } from './app/context/StoreContext';
import { store } from './app/Store/ConfigureStore';
import { Provider } from 'react-redux';
import { fetchProductsAsync } from './features/catalog/catalogSlice';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const history = createBrowserHistory();

root.render(
  <Router history={history}>
   
      <Provider store={store}>
      <App /> 
      </Provider>
     

  <React.StrictMode>
     
       
    
  </React.StrictMode>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
