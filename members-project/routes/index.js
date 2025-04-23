const { Router } = require('express');
const {
  getRegister,
  postRegister,
} = require('../controller/registerController');

const {
  getLogin,
  postLogin,
  postMember,
  getMember,
} = require('../controller/loginController');

const { postMessage } = require('../controller/messageController');

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

router.get('/member', getMember);

router.post('/member', postMember);
router.post('/member/message', postMessage);

module.exports = router;
