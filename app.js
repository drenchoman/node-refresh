const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware runs before reaching the routes
app.use(m1);
app.use(m2);
app.use(m3);

app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/', indexRouter);

function m1(req, res, next) {
  console.log('Middleware 1');
  next();
}

function m2(req, res, next) {
  console.log('Middleware 2');
  next();
}

function m3(req, res, next) {
  console.log('Middleware 3');
  next();
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
