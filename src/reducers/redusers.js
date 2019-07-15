//Неудачное завершение загрузки информации о книгах
export function itemsHasErrored(state = false, action) {
  if (action.type === 'ITEMS_HAS_ERRORED')
    return action.hasErrored;
  return state;
}

//Статус загрузки информации о книгах
export function itemsIsLoading(state = false, action) {
  if (action.type === 'ITEMS_IS_LOADING')
    return action.isLoading;
  return state;
}

//Информация о книгах
export function items(state = [], action) {
  if (action.type === 'ITEMS_FETCH_DATA_SUCCESS')
    return action.items;
  return state;
}

//Информация о книге
export function book(state = {}, action) {
  if (action.type === 'BOOK_FETCH_SUCCESS')
    return action.book;
  return state;
}

//Неудачное завершение авторизации
export function authHasErrored(state = false, action) {
  if (action.type === 'AUTH_HAS_ERRORED')
    return action.authHasErrored;
  return state;
}

//Информация о пользователе
export function authentications(state = {}, action) {
  if (action.type === 'AUTH_SUCCESS')
    return action.userInfo;
  return state;
}

//Номер страницы
export function pageNumber(state = 1, action) {
  if (action.type === 'PAGE_NUMBER')
    return action.pageFunc(state);
  return state;
}

//Строка поиска
export function searchLine(state = '', action) {
  if (action.type === 'SEARCH_LINE')
    return action.searchString;
  return state;
}

//Режим всех или пользовательских книг
export function booksMode(state = 'MY_BOOKS_MODE', action) {
  if (action.type === 'SET_BOOKS_MODE')
    return action.booksMode;
  return state;
}

/*
Шаблон поиска
searchFunc - функция формирования URL REST запроса всех или пользовательских книг
*/
export function patternSearch(state = '', action) {
  switch(action.type) {
    case 'PATTERN_SEARCH':
      return action.searchFunc;
    case 'PATTERN_LOAD':
      return action.searchFunc;
    default:
      return state;
  }
}

//Состояние кнопки пагинации
export function disablePagination(state = false, action) {
  if (action.type === 'DISABLE_PAGINATION')
    return action.emptyItems;
  return state;
}