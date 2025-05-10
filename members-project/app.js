const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('node:path');
const pool = require('./db/pool');
const { PORT } = process.env;
const router = require('./routes/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(
    { usernameField: 'alias', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const query = {
          text: 'SELECT * FROM users WHERE alias = $1',
          values: [username],
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
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    const { rows } = await pool.query(query);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(
  session({ secret: 'cats', resave: false, saveUninitialized: false })
);
app.use(flash());

app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
