const { Router } = require('express');
const {
  getRegister,
  postRegister,
} = require('../controller/registerController');

const {
  getLogin,
  postLogin,
} = require('../controller/loginController');

const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Hello World', user: req.user });
});

router.get('/register', getRegister);

router.post('/register', postRegister);
router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/member', (req, res) => {
  res.render('member', { title: 'poopoo', user: req.user });
});

module.exports = router;
