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
    required: true
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
      delete ret.passwordHash;
    }
  }
});


userSchema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS || 8);
});

userSchema.statics.authorize = function(email, password) {

  return this.findOne({ email })
    .then(user => {
      if(!user) {
        throw new Error('Invalid Email/Password');
      }

      if(!bcrypt.compareSync(password, user.passwordHash)) {
        throw new Error('Invalid Email/Password');
      }

      return user;
    });
};

userSchema.statics.verifyToken = function(token) {
  const { sub } = jwt.verify(token, process.env.APP_SECRET);
  // { _id, email, profileImage } -> user object
  return this.hydrate(sub);
};

// User -> static methods (before we have a user)
// user -> instance methods (after we have a user)
userSchema.methods.authToken = function() {
  // 2. make sure toJSON does what we want
  return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
};

module.exports = mongoose.model('User', userSchema);
