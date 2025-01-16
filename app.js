const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello world'));

// app.get('/test*/toot*', (req, res) => {
//   res.send('tester');
// });

app.get('/:username/messages/:messageId', (req, res) => {
  console.log('params', req.params);
  console.log('queries', req.query);
  res.send('poo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
