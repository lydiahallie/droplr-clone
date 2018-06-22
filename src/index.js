import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

import FoldersPage from './containers/FoldersPage';
import ImagesPage from './containers/ImagesPage';
import Page from './containers/Page';
import rootReducer from './reducers';
import './index.css';

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Page>
        <Route exact path="/" component={ImagesPage} />
        <Route path="/folders" component={FoldersPage} />
      </Page>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();
