import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { imageReducer } from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  imageReducer, 
  composeWithDevTools())

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

registerServiceWorker();
