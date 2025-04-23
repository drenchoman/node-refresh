const db = require('../db/queries');

async function postMessage(req, res) {
  try {
    const message = await db.createNewMessage(req.body, req.user);
    console.log(message);
    res.redirect('/member');
  } catch (err) {
    console.error(err);
  }
}

async function deleteMessage(req, res) {
  console.log(req.body.messageId, 'ID');
  try {
    const message = await db.deleteMessage(req.body.messageId);
    res.redirect('/member');
  } catch (err) {
    console.error(err);
  }
}

module.exports = { postMessage, deleteMessage };
