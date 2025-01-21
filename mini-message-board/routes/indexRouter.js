const { Router } = require('express');
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
  {
    text: 'I am not a bot',
    user: 'Oscar',
    added: new Date(),
  },
  {
    text: 'The internet is dead, we are all bots.',
    user: 'Katelyn',
    added: new Date(),
  },
];

const indexRouter = Router();

indexRouter.get('/', (req, res) =>
  res.render('home', {
    title: 'Mini Message-Board',
    messages: messages,
  })
);

indexRouter.post('/new', (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.status(200).redirect('/');
});

module.exports = indexRouter;
