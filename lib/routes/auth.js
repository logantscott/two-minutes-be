const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensureAuth');

const setCookie = (user, res) => {
  res.cookie('session', user.authToken(), {
    maxAge: 1000 * 60 * 60 * 24, // 1000 * 60 * 60 * 24 = 1 day
    httpOnly: true
  });
};

module.exports = Router()
  // create/signup user
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        setCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  // login user
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body.email, req.body.password)
      .then(user => {
        setCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  // verify user
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  // logout user
  .get('/logout', (req, res) => {
    res.clearCookie('session', {
      httpOnly: true
    });
    res.json({});
  });
