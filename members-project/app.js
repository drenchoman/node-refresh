const express = require('express');
const { PORT } = process.env;
const app = express();

app.get('/', (req, res) => res.send('Hello world'));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
