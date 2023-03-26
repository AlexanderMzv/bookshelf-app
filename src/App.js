import React from 'react';
import { Route, Redirect } from 'react-router';
import queryString from 'query-string';
import _ from "lodash";
import BooksPage from './components/BooksPage';
import Book from './components/Book';
import RefreshPage from './components/RefreshPage';

//Маршрутизация обработки http запросов
const App = ({location}) => (
  <div>
    <Route
      location={location}
      path='/:oauth_token?:authorize?'
      exact
      render={() => {
        let params = queryString.parse(location.search);
        return (
          _.has(params, 'authorize') && params.authorize === '1' ? (
            <BooksPage/>
          ) : (
            <Redirect to='/auth'/>
          ))
      }}
    />
    <Route
      location={location}
      path='/auth'
      exact
      component={RefreshPage}
    />
    <Route
      location={location}
      path='/book/:id'
      exact
      component={Book}
    />
  </div>
);

export default App;