const express = require('express');
const indexRouter = require('./routes/indexRouter');
const messageRouter = require('./routes/messagesRouter');
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');
const app = express();

app.use(express.static(assetsPath));
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/messages', messageRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
