import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactStars from 'react-stars';
import { bookFetch } from '../actions/actions';

/*
Описывает структуру страницы книги
book - информация о книге
fetchBookData - получение информации о книге
*/
class Book extends Component {
  componentDidMount() {
    this.props.fetchBookData(`/api/books/show_book_by_id?book_id=${this.props.match.params.id}`);
    console.log(this.props, this.props.match.params.id);
  }
  render() {
    let book = this.props.book;
    console.log(this.props, this.props.match.params.id);
    if (_.has(book, 'goodreadsId') && book.goodreadsId === this.props.match.params.id)
      return (
        <Container className='wrapper'>
          <Row className='app-header p-4'>
            <img className='book-icon' alt='book icon' src='../images/book-icon.png'/>
            <p className='page-name'>Книжная полка</p>
          </Row>
          <Row>
            <Col className='text-center' sm={2}>
              <img className='image-book-page' src={book.covers}/>
            </Col>
            <Col sm={10}>
              <Row>
                <p className='book-title'>{book.title}</p>
              </Row>
              <Row className='author-block'>
                <p className='author-name'>{book.authors}</p>
              </Row>
              <Row>
                <ReactStars className='stars-rating' count={5} value={Math.round(book.avgRating * 2) / 2} size={24}
                            edit='false' color2={'#ffd700'}/>
                <p>{book.avgRating}</p>
              </Row>
              <Row>
                <a href={book.link}>Страница книги на goodreads.com</a>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='description-book-page'>
              <p>{book.description}</p>
            </Col>
          </Row>
        </Container>
      );
    else return (
      <div className='parent-for-spinner'>
        <div className='spinner-border'/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookData: (url) => dispatch(bookFetch(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);