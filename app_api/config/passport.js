var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//query the moongoose User. If found check hash.
passport.use(new LocalStrategy({
  usernameField: 'email'
  },
  function(username, password, done){
    User.findOne({email: username}, function(err, user){
      if (err) {return done(err);}
      //return user if not in db
      if(!user){
        return done(null, false, {
          message: 'User not found'
        });
      }
      // return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'password is wrong'
        });
      }
      //if correct return user obj
      return done(null, user)
    })
  }));
