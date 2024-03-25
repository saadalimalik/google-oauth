import mongoose from 'mongoose';
import { GoogleUser } from '../interfaces/google';

const GoogleUserSchema = new mongoose.Schema<GoogleUser>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: String,
});

const GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema);

export default GoogleUser;
