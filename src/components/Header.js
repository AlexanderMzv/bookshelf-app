import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { searchLine, setBooksMode, patternSearch, patternLoad, itemsFetchData, pageNumber } from '../actions/actions';

/*
Управляющий компонент. Реализует: поиск книг, переключение между режимами всех или пользовательских книг
searchLine - строка поиска
items - список книг
booksMode - режим пользовательских или всех книг
searchBooks - отправляет поисковой запрос
setBooksMode - устанавливает режим
*/
class Header extends Component {
  constructor(props) {
    super(props);
    this.searchString = this.props.searchLine;
  }
  componentDidMount() {
    this.props.setBooksMode('MY_BOOKS_MODE', patternLoad);
  }
  setModeAll = () => {
    this.props.setBooksMode('ALL_BOOKS_MODE', patternSearch);
  };
  setModeMy = () => {
    this.props.setBooksMode('MY_BOOKS_MODE', patternLoad);
  };
  render() {
    return (
      <Container>
        <Row>
          <Col className='text-left site-title' sm={4}>
            <Row>
              <img className='book-icon' alt='book icon' src='./images/book-icon.png'/>
              <p className='page-name'>Книжная полка</p>
            </Row>
          </Col>
          <Col className='text-center' sm={4}>
            <form className='form-inline'>
              <div className='form-group mx-sm-3 mb-2'>
                <input type='search' ref={ref => this.searchString = ref} className='form-control'
                       placeholder='Название книги'/>
              </div>
              <Button type='button' variant='light' className='mb-2' onClick={(e) => {
                this.props.searchBooks(this.searchString.value)
              }}>Найти</Button>
            </form>
          </Col>
          <Col className='text-right' sm={4}>
            <ButtonGroup className='site-modes' aria-label='Basic example'>
              <Button variant='light' onClick={this.setModeMy} active={this.props.booksMode === 'MY_BOOKS_MODE'}>Мои
                книги</Button>
              <Button variant='light' onClick={this.setModeAll} active={this.props.booksMode === 'ALL_BOOKS_MODE'}>Все
                книги</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

Header.propTypes = {
  searchLine: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchLine: state.searchLine,
    items: state.items,
    booksMode: state.booksMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchBooks: (searchString) => {
      dispatch(searchLine(searchString));
      dispatch(pageNumber(() => 1));
      dispatch(itemsFetchData());
    },
    setBooksMode: (mode, patternFunc) => {
      dispatch(setBooksMode(mode));
      dispatch(patternFunc());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);