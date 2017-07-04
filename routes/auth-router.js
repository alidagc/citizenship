const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserModel = require('../models/user-model.js');

const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.locals.pageName = 'signup';
  res.render('auth-views/signup-view.ejs');
});


router.post('/signup', (req, res, next) => {
    // if username or password are not filled in
  if (req.body.userPassword === ''|| req.body.userUsername === '') {
    // Display an error to the user
    res.locals.errorMessageSignup = "Please provide both username and password";
    // res.locals.pageName = 'signup';
    res.render('auth-views/signup-view.ejs');
    return;
  }

  // Otherwise, check to see if the submitted username is taken.
  UserModel.findOne(
    {email: req.body.userEmail},
    (err, userFromDB) =>{
        if (userFromDB) {
          res.locals.errorMessageSignup = "Sorry, but that user name is taken";
          res.render('auth-views/signup-view.ejs');
          return;
        }

        // If we get here, we are ready to save the new user in the DB.
        const salt = bcrypt.genSaltSync(10);
        const scrambledPass = bcrypt.hashSync(req.body.userPassword, salt);
        // from auth-views/signup-view.ejs
        const theUser = new UserModel ({
          firstName: req.body.userFirstname,
          lastName: req.body.userLastname,
          state: req.body.userState,
          over65: req.body.userOver65,
          apptDate: req.body.userApptDate,
          email: req.body.userEmail,
          encryptedPassword: scrambledPass
        });
        theUser.save((err)=>{
          if (err) {
            next(err);
            return;
          }

          //Redirect to the home page IF registration is succesful
          res.redirect('/');
        });
      }
  );
});

// END REGISTRATION -------------------------------------


//LOG IN -------------------------------------------------
router.get('/login', (req, res, next) =>{
  res.locals.pageName = 'login';
  res.render('auth-views/login-view.ejs');
});

router.post('/login', passport.authenticate(
  'local', // 1st argument - the name of the strategy - determined by the login this youre using, its set by their documentation. like google or facebook
  {  // 2nd argument - setting object
    successRedirect: '/', // the routes you want to go to if the login has failed or succeeded
    failureRedirect: '/login'
  }
));

// END LOG IN -------------------------------------------------

// START LOGOUT ----------------------------------------
router.get('/logout', (req, res, next) => {
  res.locals.pageName = 'logout';
  req.logout();
  res.redirect('/');
});
// END LOGOUT ----------------------------------------


//SOCIAL LOGINS ----------------------------------------
router.get('/auth/facebook', passport.authenticate('facebook'));
//----------------^^ this needs to match what you entered in faebook
// If you go to localhost:3000/auth/facebook, it will direct you to facebook login page
router.get('/auth/facebook/callback',
  passport.authenticate(
    'facebook',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
));

router.get('/auth/google/',
  passport.authenticate(
    'google',
    { // The difference between facebook and google, is this scope
      scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
    }
  ));
//----------------^^ this needs to match what you entered in google
router.get('/auth/google/callback',
  passport.authenticate(
    'google',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
));



module.exports = router;
