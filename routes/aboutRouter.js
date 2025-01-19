const { Router } = require('express');

const aboutRouter = Router();

const links = [
  { href: '/', text: 'Home' },
  { href: 'about', text: 'About' },
];

aboutRouter.get('/', (req, res) =>
  res.render('about', { title: 'About', links, footer: 'Footer' })
);

module.exports = aboutRouter;
