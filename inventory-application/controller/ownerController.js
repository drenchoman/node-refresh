const expressAsyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters';
const lengthErr = 'must be between 1 and 15 characters';

const validateOwner = [
  body('name')
    .trim()
    .isAlpha()
    .withMessage(`Owner name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Owner name ${lengthErr}`),
];

async function getOwners(req, res) {
  const owners = await db.getAllOwners();
  res.render('./owner/owners', {
    title: 'Behold, the Emoji Owners.',
    owners,
  });
}

// Using Async Handler
const getOwner = expressAsyncHandler(async (req, res) => {
  const emojis = await db.getOwnerEmojis(Number(req.params.id));
  if (!emojis) {
    res.status(404).send('No emojis');
  }

  res.render('./owner/owner', {
    title: `Emojis owned by ${emojis[0].owner_name}`,
    emojis,
  });
});

async function getNewOwner(req, res) {
  res.render('./owner/createOwner', { title: 'Add a New Owner' });
}
const postNewOwner = [
  validateOwner,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('./owner/createOwner', {
        title: 'Add a New Owner',
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    const owner = await db.createNewOwner(name);
    console.log(owner);

    res.redirect('/owners');
  },
];

module.exports = {
  getOwners,
  getOwner,
  getNewOwner,
  postNewOwner,
};
