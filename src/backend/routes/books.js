import express from 'express';
import request from 'request-promise';
import _ from 'lodash';
import { parseString } from 'xml2js';
import grObject from '../gr'

const router = express.Router();

//Поиск книг по названию
router.get('/search', (req, res) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=${process.env
        .GOODREADS_KEY}&q=${req.query.q}&page=${req.query.page}&search[field]=title`
    )
    .then(info =>
      parseString(info, (err, goodreadsResult) => {
        if (_.has(goodreadsResult.GoodreadsResponse, 'search[0].results[0].work'))
          res.json({
            books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
              work => ({
                goodreadsId: work.best_book[0].id[0]._,
                title: work.best_book[0].title[0],
                authors: work.best_book[0].author[0].name[0],
                covers: [work.best_book[0].image_url[0]]
              })
            )
          });
        else res.json({books: []});
      })
    )
    .catch((err) => {
      console.log('search_err: ');
      console.log(err);
    });
});

//Получение информации о пользователе
router.get('/current_user_info', (req, res) => {
  grObject.gr.getAccessToken()
    .then(grObject.gr.getCurrentUserInfo)
    .then((info) => {
      res.json(info)
    })
    .catch((err) => {
      console.log('user_info_err: ');
      console.log(err);
    });
});

//Получение книг пользователя
router.get('/owned_books', (req, res) => {
  grObject.gr.getOwnedBooks(req.query.user_id, req.query.page)
    .then((info) => {
      if (_.has(info, 'owned_books.owned_book'))
        res.json({
          books: info.owned_books.owned_book.map(
            work => ({
              goodreadsId: work.book.id._,
              title: work.book.title,
              authors: work.book.authors.author.name,
              covers: [work.book.image_url],
            })
          )
        });
      else res.json({books: []});
    })
    .catch((err) => {
      console.log('owned_book_err: ');
      console.log(err);
    });
});

//Получение информации о книге по её id
router.get('/show_book_by_id', (req, res) => {
  grObject.gr.showBook(req.query.book_id)
    .then((info) => {
      res.json({
        book: {
          goodreadsId: info.book.id,
          title: info.book.title,
          authors: info.book.authors.author.name,
          covers: [info.book.image_url],
          avgRating: info.book.average_rating,
          description: (info.book.description).replace(/(<([^>]+)>)/ig, ' '),
          link: info.book.link
        }
      })
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;