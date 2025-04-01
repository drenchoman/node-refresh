const path = require('node:path');
const pool = require('./db/pool');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PORT } = process.env;

const signUpRouter = require('./routes/sign-up');
const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
      };
      const { rows } = await pool.query(query);

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Saves session / cookie using the id of the user

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({ secret: 'cats', resave: false, saveUninitialized: false })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
