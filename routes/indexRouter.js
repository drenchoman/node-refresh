const { Router } = require('express');
const indexRouter = Router();

const links = [
  { href: '/', text: 'Home' },
  { href: 'about', text: 'About' },
];

const users = ['Oscar', 'Kately', 'Leo'];

indexRouter.get('/', (req, res) =>
  res.render('index', { links, users })
);

module.exports = indexRouter;
