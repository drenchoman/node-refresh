const express = require('express');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
