const express = require('express');
const path = require('node:path');
const app = express();

app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
