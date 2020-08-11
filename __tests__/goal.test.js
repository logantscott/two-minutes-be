require('../data-helpers/data-helpers');
const { agent, prepare } = require('../data-helpers/data-helpers');

const User = require('../lib/models/User');

describe('goal routes', () => {
  it('can create a goal', async() => {
    let user = prepare(await User.findOne());
    User.authorize(user.email, '1234');

    return agent
      .post('/api/v1/goals')
      .send({
        name: 'My first goal',
        user: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'My first goal',
          user: user._id,
          __v: 0
        });
      });
  });
});
