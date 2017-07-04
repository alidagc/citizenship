const mongoose = require('mongoose');
const QuestionModel = require('./question-model.js');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  state: {type: String},
  over65: {type: Boolean},
  apptDate: {type: Date},
  weakQuestions: [Schema.Types.ObjectId],
  checklist: {type:[String]},
  encryptedPassword:{type: String},
  //GOOGLE users---------------------
  googleId: {type: String},
  //FACEBOOK users---------------------
  facebookId: {type: String}
},
{   // 2nd argument for Schema --> additional settings
    timestamps: true
    //timestamps creates two additional fields: "createdAt" & "updatedAt"
});

const UserModel = mongoose.model ('User', UserSchema);

module.exports = UserModel;
