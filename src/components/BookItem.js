import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'

/*
Отображения элемента
book - свойства элемента
*/
class BookItem extends Component {
  render() {
    let book = this.props.book;
    return (
      <Container key={'ib' + book.goodreadsId}>
        <Link className='link-to-book' to={`/book/${book.goodreadsId}`}>
          <Row className='image-block'>
            <img alt="book-cover" className='book-image' src={book.covers}/>
          </Row>
          <Row className='book-item-title'>
            <p>{book.title}</p>
          </Row>
          <Row className='book-item-author'>
            <p>{book.authors}</p>
          </Row>
        </Link>
      </Container>
    );
  }
}

export default BookItem;