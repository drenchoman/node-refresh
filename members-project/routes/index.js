const { Router } = require('express');
const {
  getRegister,
  postRegister,
} = require('../controller/registerController');

const {
  getLogin,
  postLogin,
  postMember,
} = require('../controller/loginController');

const router = Router();

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/member');
  } else {
    res.render('home', { title: 'Hello World', user: req.user });
  }
});

router.get('/register', getRegister);

router.post('/register', postRegister);
router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/member', (req, res) => {
  res.render('member', { title: 'poopoo', user: req.user });
});

router.post('/member', postMember);

module.exports = router;
