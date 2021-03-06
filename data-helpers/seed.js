const chance = require('chance').Chance();

const User = require('../lib/models/User');
const Goal = require('../lib/models/Goal');
const Measure = require('../lib/models/Measure');
const Datapoint = require('../lib/models/Datapoint');

module.exports = async({ users = 20, goals = 100, measures = 300, datapoints = 1000 } = {}) => {

  const createdUsers = await User.create([...Array(users)].map(() => ({
    name: chance.name(),
    email: chance.email({ domain: 'email.com' }),
    password: '1234'
  })))
    .then(async(res) => {
      await Goal.create(res.map((user) => ({
        name: chance.sentence(),
        user: user._id
      })))
        .then(async(res) => {
          await Measure.create(res.map((goal) => {
            return {
              name: chance.word(),
              user: goal.user,
              goal: goal._id
            };
          }))
            .then(async(res) => {
              await Datapoint.create(res.map((measure) => ({
                completed: chance.bool({ likelihood: 75 }),
                measure: measure._id
              })));
            });
        });
    });

  await User.create([...Array(1)].map(() => ({
    name: 'Logan',
    email: 'logan@logan.com',
    password: '1234'
  })))
    .then(async(res) => {
      await Goal.create(res.map((user) => ({
        name: chance.sentence(),
        user: user._id
      })))
        .then(async(res) => {
          await Measure.create(res.map((goal) => {
            return {
              name: chance.word(),
              user: goal.user,
              goal: goal._id
            };
          }))
            .then(async(res) => {
              await Datapoint.create(res.map((measure) => ({
                completed: chance.bool({ likelihood: 75 }),
                measure: measure._id
              })));
            });
        });
    });

  // const createdGoals = await Goal.create([...Array(goals)].map(() => ({
  //   name: chance.sentence(),
  //   user: chance.pickone(createdUsers)._id
  // })));
  
  // const createdMeasures = await Measure.create([...Array(measures)].map(() => {
  //   const goal = chance.pickone(createdGoals);

  //   return {
  //     name: chance.word(),
  //     user: goal.user,
  //     goal: goal._id
  //   };
  // }));

  // await Datapoint.create([...Array(datapoints)].map(() => ({
  //   name: chance.bool({ likelihood: 75 }),
  //   measure: chance.pickone(createdMeasures)._id
  // })));

};
