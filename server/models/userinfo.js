/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
The Model for User. Aaishi Developed this.
 */

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  collection: 'User'
});

let User = mongoose.model('User', userSchema);

export default User;
