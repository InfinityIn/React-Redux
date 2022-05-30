import React from 'react';
import ReactDOM from 'react-dom'
import {compose, applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import App from './App';
import {rootReducer} from './redux/rootReducer'
import {forbiddenWordsMiddleware} from './redux/middleware'
import {sagaWatcher} from './redux/sagas'
import reportWebVitals from './reportWebVitals';


const saga = createSagaMiddleware()

const store = configureStore(rootReducer, compose(
  applyMiddleware(
    thunk, forbiddenWordsMiddleware, saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(sagaWatcher)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();