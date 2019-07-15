import express from 'express';
import grObject from "../gr";

const router = express.Router();

//Аутентификация пользователя и получение request token
router.get('/auth', (req, res) => {
  const callbackURL = 'http://localhost:8080/index.html';

  grObject.gr.initOAuth(callbackURL);
  grObject.gr.getRequestToken()
    .then(url => {
      res.redirect(url);
    })
});

export default router;