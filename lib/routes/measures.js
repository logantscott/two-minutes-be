const { Router } = require('express');
const Measure = require('../models/Measure');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

  // create a new measure
  .post('/', ensureAuth, (req, res, next) => {
    Measure
      .create(req.body)
      .then(measure => res.send(measure))
      .catch(next);
  })

  // get all measures or search measures
  .get('/', ensureAuth, (req, res, next) => {
    Measure
      .find(req.query)
      // .select({
      //   name: true
      // })
      .then(measures => res.send(measures))
      .catch(next);
  })

  // get details of a measure by id
  .get('/:id', ensureAuth, (req, res, next) => {
    Measure
      .findById(req.params.id)
      .then(measure => res.send(measure))
      .catch(next);
  })

  // update a measures title or description
  .patch('/:id', ensureAuth, (req, res, next) => {
    Measure
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(measure => res.send(measure))
      .catch(next);
  })

  // delete a measure
  .delete('/:id', ensureAuth, (req, res, next) => {
    Measure
      .findByIdAndDelete(req.params.id)
      .then(measure => res.send(measure))
      .catch(next);
  });
