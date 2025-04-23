const db = require('../db/queries');

async function postMessage(req, res) {
  console.log(req.user);
  try {
    const message = await db.createNewMessage(req.body, req.user);
    console.log(message);
    res.redirect('/member');
  } catch (err) {
    console.error(err);
  }
}

module.exports = { postMessage };
