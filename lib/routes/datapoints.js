const { Router } = require('express');
const Datapoint = require('../models/Datapoint');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

  // create a new datapoint
  .post('/', ensureAuth, (req, res, next) => {
    Datapoint
      .create(req.body)
      .then(datapoint => res.send(datapoint))
      .catch(next);
  })

  // get all datapoints or search datapoints
  .get('/', ensureAuth, (req, res, next) => {
    Datapoint
      .find(req.query)
      // .select({
      //   name: true
      // })
      .then(datapoints => res.send(datapoints))
      .catch(next);
  })

  // get details of a datapoint by id
  .get('/:id', ensureAuth, (req, res, next) => {
    Datapoint
      .findById(req.params.id)
      .then(datapoint => res.send(datapoint))
      .catch(next);
  })

  // update a datapoints title or description
  .patch('/:id', ensureAuth, (req, res, next) => {
    Datapoint
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(datapoint => res.send(datapoint))
      .catch(next);
  })

  // delete a datapoint
  .delete('/:id', ensureAuth, (req, res, next) => {
    Datapoint
      .findByIdAndDelete(req.params.id)
      .then(datapoint => res.send(datapoint))
      .catch(next);
  });
