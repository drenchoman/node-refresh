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

const {
  postMessage,
  deleteMessage,
  getAllMessages,
} = require('../controller/messageController');

const router = Router();

router.get('/', getAllMessages);

router.get('/register', getRegister);

router.post('/register', postRegister);
router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/member', getMember);

router.post('/member', postMember);
router.post('/member/message', postMessage);
router.post('/member/message/delete', deleteMessage);

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
