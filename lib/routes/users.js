const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  // search for users or get all users
  .get('/', ensureAuth, (req, res, next) => {
    User
      .find(req.query)
      .select({
        name: true
      })
      .then(users => res.send(users))
      .catch(next);
  })

  // get a user by id
  .get('/:id', ensureAuth, (req, res, next) => {
    User
      .findById(req.params.id)
      .select({
        name: true
      })
      .then(users => res.send(users))
      .catch(next);
  })

  // update a user
  .patch('/:id', ensureAuth, (req, res, next) => {
    User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => res.send(user))
      .catch(next);
  })

  // delete a user
  .delete('/:id', ensureAuth, (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  });
