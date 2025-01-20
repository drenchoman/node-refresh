const { Router } = require('express');

const messageRouter = Router();

messageRouter.get('/', (req, res) => res.redirect('/messages/new'));

messageRouter.get('/new', (req, res) => {
  res.render('newMessage', { title: 'New Message' });
});

module.exports = messageRouter;
