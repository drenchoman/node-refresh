const { Router } = require('express');
const {
  getRegister,
  postRegister,
} = require('../controller/registerController');

const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Hello World' });
});

router.get('/register', getRegister);

router.post('/register', postRegister);

module.exports = router;
