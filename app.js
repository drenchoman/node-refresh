const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');

app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
