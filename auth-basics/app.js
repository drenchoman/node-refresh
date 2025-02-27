const path = require('node:path');
const { Pool } = require('pg');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT, PORT } =
  process.env;
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});
const signUpRouter = require('./routes/sign-up');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({ secret: 'cats', resave: false, saveUninitialized: false })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index'));
app.use('/sign-up', signUpRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
