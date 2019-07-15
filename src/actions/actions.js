import axios from 'axios';
import _ from 'lodash';

const patternSearchURL = (userID, searchString, pageNum) => `/api/books/search?q=${searchString}&page=${pageNum}`;
const patternLoadURL = (userID, searchString, pageNum) => `/api/books/owned_books?user_id=${userID}&page=${pageNum}`;

//Строка поиска
export function searchLine(searchString) {
  return {
    type: 'SEARCH_LINE',
    searchString
  };
}

/*
Шаблон поиска
searchFunc - функция формирования URL REST запроса всех книг
*/
export function patternSearch() {
  return {
    type: 'PATTERN_SEARCH',
    searchFunc: patternSearchURL
  };
}

/*
Шаблон загрузки
searchFunc - функция формирования URL REST запроса книг пользователя
*/
export function patternLoad() {
  return {
    type: 'PATTERN_LOAD',
    searchFunc: patternLoadURL
  };
}

//Установка режима всех или пользовательских книг
export function setBooksMode(mode) {
  return {
    type: 'SET_BOOKS_MODE',
    booksMode: mode
  };
}

//Неудачное завершение авторизации
export function authHasErrored(bool) {
  return {
    type: 'AUTH_HAS_ERRORED',
    authHasErrored: bool
  };
}

//Удачное завершение авторизации
export function authSuccess(userInfo) {
  return {
    type: 'AUTH_SUCCESS',
    userInfo
  };
}

//Запрос на получение информации о пользователе
export function userData(url) {
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data.user;
      })
      .then((user) => {
        dispatch(authSuccess(user));
        dispatch(itemsFetchData());
      })
      .catch(() => dispatch(authHasErrored(true)));
  };
}

//Номер страницы
export function pageNumber(pf) {
  return {
    type: 'PAGE_NUMBER',
    pageFunc: pf
  };
}

//Неудачное завершение загрузки информации о книгах
export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  };
}

//Статус загрузки информации о книгах
export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}

//Удачное завершение загрузки информации о книгах
export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

//Удачное завершение загрузки информации о книге
export function bookFetchSuccess(book) {
  return {
    type: 'BOOK_FETCH_SUCCESS',
    book
  };
}

//Неудачное завершение загрузки информации о книге
export function bookFetchHasErrored(bool) {
  return {
    type: 'BOOK_FETCH_HAS_ERRORED',
    bookFetchHasErrored: bool
  };
}

//Состояние кнопки пагинации
export function disablePagination(bool) {
  return {
    type: 'DISABLE_PAGINATION',
    emptyItems: bool
  };
}

//Запрос на получение информации о книге
export function bookFetch(url) {
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data.book;
      })
      .then((book) => {
        dispatch(bookFetchSuccess(book))
      })
      .catch(() => dispatch(bookFetchHasErrored(true)));
  };
}

//Запрос на получение информации о книгах
export function itemsFetchData() {
  return (dispatch, getState) => {
    let gs = getState();
    let url = gs.patternSearch(gs.authentications.id, gs.searchLine, gs.pageNumber);
    dispatch(itemsIsLoading(true));
    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        if (_.has(response, 'data.books') && response.data.books.length > 0) {
          dispatch(disablePagination(false));
        }
        else {
          dispatch(disablePagination(true));
        }
        if (gs.pageNumber === 1)
          return response.data.books;
        else return gs.items.concat(response.data.books);
      })
      .then((books) => dispatch(itemsFetchDataSuccess(books)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}