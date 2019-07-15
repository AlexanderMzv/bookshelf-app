import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import App from './App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

//Корневой компонент
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App}/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();