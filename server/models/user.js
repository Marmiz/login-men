const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name: String
});

userSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

// generate a hash from a generated earlier salt string and a user’s password.
userSchema.pre('save', function saveHook(next){
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {return next(saltError);}

    return bcrypt.hash(user.password, salt, (hashError, hash) =>{
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

mongoose.model('User', userSchema);
