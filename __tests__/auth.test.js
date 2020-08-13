require('../data-helpers/data-helpers');
const { agent } = require('../data-helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {
  it('signs up a user with name, email, and password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Logan Scott',
        email: 'test@test.com',
        password: '1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Logan Scott',
          email: 'test@test.com'
        });
      });
  });

  it('logs in a user with email and password', async() => {
    await User.create({
      name: 'Logan Scott',
      email: 'test@test.com',
      password: '1234'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: '1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Logan Scott',
          email: 'test@test.com'
        });
      });
  });

  it('verifies a signed up user', () => {
    const agent = request.agent(app);
    return agent
      .post('/api/v1/auth/signup')
      .send({ name: 'Logan Scott', email: 'test@tester.com', password: '1234' })
      .then(() => agent.get('/api/v1/auth/verify'))
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Logan Scott',
          email: 'test@tester.com'
        });
      });
  });

  it('verifies a logged in user', () => {
    //agent from data-helper is created through model and logged in through route
    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Logan Scott',
          email: 'email@email.com'
        });
      });
  });
});
