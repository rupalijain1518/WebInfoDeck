import React from 'react';
import ReactDOM from 'react-dom';

import AuthProvider from './provider/AuthProvider'
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as fire from './config/fire'
const store = createStore(rootReducer,{},
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fire),
    reactReduxFirebase(fire) // redux binding for firebase
     // redux bindings for firestore
  )
);


ReactDOM.render(
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

