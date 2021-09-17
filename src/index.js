import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD14dN09eIE9BpY_L8WbhX7R7T4vepWVJ0",
  authDomain: "group-chat-43506.firebaseapp.com",
  projectId: "group-chat-43506",
  storageBucket: "group-chat-43506.appspot.com",
  messagingSenderId: "820416837001",
  appId: "1:820416837001:web:adf7d94b555a7bc8b51d58",
  measurementId: "G-BFK2SE4JMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
