import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import App from './components/App';
import Folders from './components/Folders';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Images } from './components/Images';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <App>
        <Route exact path="/" component={Images} />
        <Route path="/folders" component={Folders} />
      </App>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();
