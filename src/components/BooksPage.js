import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import BookList from './BookList';
import BookSearch from './Header';
import Pagination from './Pagination';
import { userData } from '../actions/actions';
import '../App.css';

/*
Описывает структуру главной страницы
authentications - информация о пользователе
itemsIsLoading - статус загрузки данных
userData - запрос на получение информации о пользователе
*/
class BooksPage extends Component {
  componentDidMount() {
    if (!_.has(this, 'props.authentications.id'))
      this.props.userData('/api/books/current_user_info');
  }
  render() {
    return (
      <Container className='wrapper'>
        <div>
          <Row className='app-header p-4'>
            <BookSearch/>
          </Row>
          <Row className='app-content'>
            {
              this.props.itemsIsLoading || !_.has(this, 'props.authentications.id')
                ? <div className='parent-for-spinner'>
                  <div className='spinner-border'/>
                </div>
                : null
            }
            <BookList/>
          </Row>
          <Row className='app-pagination p-2'>
            <Pagination/>
          </Row>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    authentications: state.authentications,
    itemsIsLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userData: (url) => dispatch(userData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);