import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookItem from './BookItem';

/*
Отображает список элементов
items - список книг
*/
class BookList extends Component {
  render() {
    return (this.props.items.map((item) => (
      <div className='book-item'>
        <BookItem book={item}/>
      </div>
    )));
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps)(BookList);