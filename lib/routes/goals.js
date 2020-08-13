const { Router } = require('express');
const Goal = require('../models/Goal');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

  // create a new goal
  .post('/', ensureAuth, (req, res, next) => {
    Goal
      .create(req.body)
      .then(goal => res.send(goal))
      .catch(next);
  })

  // get all goals or search goals
  .get('/', ensureAuth, (req, res, next) => {
    Goal
      .find(req.query)
      // .select({
      //   name: true
      // })
      .then(goals => res.send(goals))
      .catch(next);
  })

  // get details of a goal by id
  .get('/:id', ensureAuth, (req, res, next) => {
    Goal
      .findById(req.params.id)
      .then(goal => res.send(goal))
      .catch(next);
  })

  // update a goals title or description
  .patch('/:id', ensureAuth, (req, res, next) => {
    Goal
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(goal => res.send(goal))
      .catch(next);
  })

  // delete a goal
  .delete('/:id', ensureAuth, (req, res, next) => {
    Goal
      .findByIdAndDelete(req.params.id)
      .then(goal => res.send(goal))
      .catch(next);
  });
