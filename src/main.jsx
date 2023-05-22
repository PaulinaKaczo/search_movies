

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCC2MfTF2lPEMqjKWp_oOF08cxMxNPGIEQ",
    authDomain: "skynet-8775e.firebaseapp.com",
    projectId: "skynet-8775e",
    storageBucket: "skynet-8775e.appspot.com",
    messagingSenderId: "92394555055",
    appId: "1:92394555055:web:9cb80954ee1fd6a8cb365a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
