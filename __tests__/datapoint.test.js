require('../data-helpers/data-helpers');
const { agent, prepare } = require('../data-helpers/data-helpers');

const User = require('../lib/models/User');
const Goal = require('../lib/models/Goal');
const Measure = require('../lib/models/Measure');

describe('datapoint routes', () => {
  it('can create a datapoint', async() => {
    let user = prepare(await User.findOne());
    let goal = prepare(await Goal.findOne({ user: user._id }));
    let measure = prepare(await Measure.findOne({ goal: goal._id }));

    return agent
      .post('/api/v1/datapoints')
      .send({
        completed: true,
        measure: measure._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          completed: true,
          measure: measure._id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
});
