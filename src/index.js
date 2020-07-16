import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './provider/AuthProvider'
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

