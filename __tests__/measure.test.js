require('../data-helpers/data-helpers');
const { agent, prepare } = require('../data-helpers/data-helpers');

const User = require('../lib/models/User');
const Goal = require('../lib/models/Goal');

describe('measure routes', () => {
  it('can create a measure', async() => {
    let user = prepare(await User.findOne());
    User.authorize(user.email, '1234');
    let goal = prepare(await Goal.findOne({ user: user._id }));

    return agent
      .post('/api/v1/measures')
      .send({
        name: 'My first measure',
        user: user._id,
        goal: goal._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'My first measure',
          frequency: 1,
          frequencyType: 'days',
          user: user._id,
          goal: goal._id,
          __v: 0
        });
      });
  });
});
