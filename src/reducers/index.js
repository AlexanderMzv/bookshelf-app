import { combineReducers } from 'redux';
import {
  items, itemsHasErrored, itemsIsLoading, authentications, authHasErrored, authIsLoading, pageNumber,
  searchLine, patternSearch, booksMode, book, disablePagination
} from './redusers';

//Редьюсеры приложения
export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  searchLine,
  authentications,
  authHasErrored,
  authIsLoading,
  pageNumber,
  patternSearch,
  booksMode,
  book,
  disablePagination
});