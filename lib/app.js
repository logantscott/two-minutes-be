const express = require('express');
const app = express();

app.use(require('cookie-parser')());
app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/goals', require('./routes/goals'));
app.use('/api/v1/measures', require('./routes/measures'));
app.use('/api/v1/datapoints', require('./routes/datapoints'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
