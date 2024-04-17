import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

// Schema of the users.
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is required."],
    unique: [true, "this username is already taken."]
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  user_type: {
    type: String,
    required: true,
    enum: ["Customer", "Manager", "Vendor"],
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
});


// Userschema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id, role: this.role }, 'yourSecretKey', { expiresIn: '1h' });
//     return token;
// };

export const User = mongoose.model("User",UserSchema);

export default User;