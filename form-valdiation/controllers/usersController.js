const usersStorage = require('../storages/usersStorages');

exports.usersListGet = (req, res) => {
  res.render('index', {
    title: 'User List',
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('createUser', {
    title: 'Create user',
  });
};

exports.usersCreatePost = (req, res) => {
  const { firstName, lastName } = req.body;

  usersStorage.addUser({ firstName, lastName });
  res.redirect('/');
};
