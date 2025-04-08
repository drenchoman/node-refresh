const express = require('express');
const path = require('node:path');
const pool = require('./db/pool');
const { PORT } = process.env;
const router = require('./routes/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async (alias, password, done) => {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE alias = $1',
        values: [alias],
      };
      const { rows } = await pool.query(query);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect alias' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
