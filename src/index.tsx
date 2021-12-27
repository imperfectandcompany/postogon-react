import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthedContext';
import { Provider } from 'react-redux';
import {store} from './app/store';
/*
AuthProvider helps us manage and authenticate users
Provider Store provides us access to our store
for our react components.
*/
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
        </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
