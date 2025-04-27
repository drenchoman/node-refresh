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
  try {
    const message = await db.deleteMessage(req.body.messageId);
    res.redirect('/member');
  } catch (err) {
    console.error(err);
  }
}

async function getAllMessages(req, res) {
  if (req.user) {
    res.redirect('/member');
  } else {
    try {
      const messages = await db.getAllMessages();
      res.render('home', {
        messages: messages,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { postMessage, deleteMessage, getAllMessages };
