const express = require('express');
const path = require('node:path');
const emojiRouter = require('./routes/emojiRouter');
const assetsPath = path.join(__dirname, 'public');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', emojiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
