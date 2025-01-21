const { Router } = require('express');

const messageRouter = Router();

messageRouter.get('/', (req, res) => res.redirect('/messages/new'));

messageRouter.get('/new', (req, res) => {
  res.render('newMessage', { title: 'New Message' });
});

messageRouter.post('/new', (req, res) => {
  console.log(req.body);
  res.status(200);
});

module.exports = messageRouter;
