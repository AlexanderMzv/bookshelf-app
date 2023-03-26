import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { itemsFetchData, pageNumber } from '../actions/actions';

/*
Реализует пагинацию
pageNumber - текущий номер страницы
disablePagination - состояние кнопки пагинации
nextPage - увеличивает номер страницы и отправляет запрос на её получение
*/
class Pagination extends Component {
  render() {
    return (
      <Container className='text-center'>
        <Row>
          <Col>
            <Button type='button' className='mb-2 pagination-button' onClick={this.props.nextPage}
                    disabled={this.props.disablePagination}>Загрузить ещё</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.pageNumber,
    disablePagination: state.disablePagination
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPage: () => {
      dispatch(pageNumber(_ => _ + 1));
      dispatch(itemsFetchData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);