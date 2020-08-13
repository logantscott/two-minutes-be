const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});


userSchema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS || 8);
});

// User -> static methods (before we have a user)
// user -> instance methods (after we have a user)

userSchema.statics.authorize = function(email, password) {

  const authError = function() {
    const error = new Error('Invalid Email/Password');
    error.status = 401;
    return error;
  };

  return this.findOne({ email })
    .then(user => {
      if(!user) throw authError();
      if(!bcrypt.compareSync(password, user.passwordHash)) throw authError();
      return user;
    });
};

userSchema.statics.verifyToken = function(token) {
  try {
    const { sub } = jwt.verify(token, process.env.APP_SECRET);
    // { _id, name, email } -> user object
    return this.hydrate(sub);
  } catch(e) {
    const error = new Error(`Invalid or missing token: ${token}`);
    error.status = 401;
    throw error;
  }
};

userSchema.methods.authToken = function() {
  // 2. make sure toJSON does what we want
  return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
};

module.exports = mongoose.model('User', userSchema);
