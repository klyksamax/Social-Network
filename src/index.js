import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index'


const firebaseConfig = {
  apiKey: "AIzaSyAycdeFLXivCfzYVCorKAZRq259D90C_5o",
  authDomain: "auth-example-92ace.firebaseapp.com",
  databaseURL: "https://auth-example-92ace-default-rtdb.firebaseio.com",
  projectId: "auth-example-92ace",
  storageBucket: "auth-example-92ace.appspot.com",
  messagingSenderId: "196907739238",
  appId: "1:196907739238:web:3bb712b9fc7fd15146a5a7"
};


export const Context = createContext(null)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore =  getFirestore(app);



ReactDOM.render(
<React.StrictMode>
<BrowserRouter>
<Provider store={store}>
<Context.Provider 
    value={{
      app,
      auth,
      firestore
  }}
    >
    <App />
    </Context.Provider>
</Provider>
</BrowserRouter>
</React.StrictMode>,
  document.getElementById('root')
);
