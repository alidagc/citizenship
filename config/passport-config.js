// We are configuring Passport in a separate file
// to avoid making a mess in app.js

const passport = require('passport');
const bcrypt = require('bcrypt');
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require('../models/user-model.js');

// ALWAYS SET UP THESE TWO THE SAME WAY
//serializeuser (controls what goes inside the bowl)
   // - It saved the user's ID in the bowl
   // - It happens ONLY when you log in
passport.serializeUser((userFromDB, next)=> {
  next(null, userFromDB._id);
}); // this means everything is good to go, move on.

// deserializeuser (controls what you get when you check the bowl)
   // - Use the ID in the bowl to retrieve the user's information
   // - Happens every time you visit any page on the site after logging in
passport.deserializeUser((idFromBowl, next)=>{
  UserModel.findById(
    idFromBowl,
    (err, userFromDB) => {
      if (err) {
        next(err);
        return;
      }
      //Tell passport that we gor the user's info from the DB
      next(null, userFromDB); // null in first argument means NO ERROR
    }
  );
});

//STRATEGIES (different ways you can log in) -----------------------
//SETUP passport-local
const LocalStategy = require('passport-local').Strategy;

passport.use(new LocalStategy(
  {   // 1st argument  -> settings object, the key values are always the same
    usernameField: 'loginUsername', // these are the names in the login form
    passwordField: 'loginPassword' // these will be replacing the formUsername and formPassword variables below
  },
  (formUsername, formPassword, next) =>{ // 2nd argument  -> callback (will be called when a user tries to login)
// 1st thing to consider: Is there an account in the database with the provided username?
  UserModel.findOne(
    {username: formUsername },
    (err, userFromDB) =>{
      if(err) {
        next(err);
        return;
      }
      if (userFromDB === null){
        // in Passport, if you call next with "false",
        //that means you are telling Passport that login failed.
        next(null, false);
        return;
      }

      //2nd: If there is a user with that username, is the PASSWORD correct?
      if (bcrypt.compareSync(formUsername, userFromDB.encryptedPassword) === false){
      // This is comparing the encripted password that was just entered
      // vs the encripted password from the database
      // in Passport, if you call next with "false",
      //that means you are telling Passport that LOGIN FAILED.
        next(null, false);
        return;
      }
      // In Passport is you call next with a user in 2nd position,
      // that means LOGIN SUCCESS
      next(null, userFromDB);
    }
  );
  }
));

// log in with your Google account ------------------

passport.use(new GoogleStrategy(
  {   //1st argument -> settings object. The keys NEED to have that name
    clientID: process.env.myGoogleId,
    clientSecret: process.env.myGoogleSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, next) => { // 2nd argument -> callback
    console.log('');
    console.log('---------GOOGLE PROFILE LOGIN---------------');      // will be called when a user allows us to log them in with facebook
    console.log(profile);

    UserModel.findOne(
      {googleId: profile.id},
      (err, userFromDB) =>{
          // if this is the first time the user logs in with google, userfromDB will be empty in that case
        if (userFromDB){ // if there is already been someone with that user here, then nbd, keep going
          next(null, userFromDB);
          return;
        }
        // But if its the first time, save them in the database
        const theUser = new UserModel({
          fullName: profile.displayname,
          googleId: profile.id
        });
// The name from Google comes from google+, which most people dont have, so the thing below tells it to substitute email for username
        if (theUser.fullName === undefined) {
          theUser.fullName = profile.emails[0].value;
        }

        theUser.save((err)=>{
          if (err){
            next(err);
            return;
          }
          // Now that they are saved, log them in.
          next(null, theUser);
        });
      }
    );
  }
));

//to log in with Facebook -------

passport.use(new FbStrategy(
  {   //1st argument -> settings object. The keys NEED to have that name
    clientID: process.env.myFacebookId,
    clientSecret: process.env.myFacebookSecret,
    callbackURL: '/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, next) => { // 2nd argument -> callback
    console.log('');
    console.log('---------FACEBOOK PROFILE LOGIN---------------');      // will be called when a user allows us to log them in with facebook
    console.log(profile);

    UserModel.findOne(
      {facebookId: profile.id},
      (err, userFromDB) =>{
          // if this is the first time the user logs in with facebook, userfromDB will be empty in that case
        if (userFromDB){ // if there is already been someone with that user here, then nbd, keep going
          next(null, userFromDB);
          return;
        }
        // But if its the first time, save them in the database
        const theUser = new UserModel({
          fullName: profile.displayname,
          facebookId: profile.id
        });

        theUser.save((err)=>{
          if (err){
            next(err);
            return;
          }
          // Now that they are saved, log them in.
          next(null, theUser);
        });
      }
    );
  }
));
