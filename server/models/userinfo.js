//User Model
//Username, Password, UserType (Nurse Model or Patient Model) 
//Aashi

import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  
  userName: {
      type: String,
      default: '',
      trim: true,
      required: true
  },
  password: {
    type: String,
    default: '',
    trim: true,
    required: true
}, 
  userType: {
      type: String,
      default: '',
      trim: true,
      required: true
  }
},
{
  collection: 'User'
});

let User = mongoose.model('User', userSchema);

export default User;
