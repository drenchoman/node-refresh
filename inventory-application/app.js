const express = require('express');
const path = require('node:path');
const emojiRouter = require('./routes/emojiRouter');
const ownerRouter = require('./routes/ownerRouter');
const catgoryRouter = require('./routes/categoryRouter');
const assetsPath = path.join(__dirname, 'public');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', emojiRouter);
app.use('/owners', ownerRouter);
app.use('/categories', catgoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Oops!',
    message: 'Something went wrong',
  });
});
