import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import books from './routes/books';
import index from './routes/index';

//Маршруты обработки REST запросов
dotenv.config();
const app = express();

app.use(express.static('build'));
app.use(bodyParser.json());
app.use('/api/books', books);
app.use('/', index);

app.listen(8080, () => console.log('Running on localhost:8080'));