const db = require('../db/queries');

async function getOwners(req, res) {
  const owners = await db.getAllOwners();
  res.render('./owner/owners', {
    title: 'Behold, the Emoji Owners.',
    owners,
  });
}

async function getOwner(req, res) {
  const emojis = await db.getOwnerEmojis(Number(req.params.id));

  res.render('./owner/owner', {
    title: `Emojis owned by ${emojis[0].owner_name}`,
    emojis,
  });
}

async function getNewOwner(req, res) {
  res.render('./owner/createOwner', { title: 'Add a New Owner' });
}

async function postNewOwner(req, res) {
  const owner = await db.createNewOwner(req.body);
  console.log(owner);

  res.redirect('/owners');
}

module.exports = {
  getOwners,
  getOwner,
  getNewOwner,
  postNewOwner,
};
