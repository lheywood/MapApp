const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const middlewares = require('./middlewares');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at port http://localhost:${port}`);
});
