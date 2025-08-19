import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for OAuth users
  provider: { type: String, default: 'local' },
  name: { type: String },
  googleId: { type: String },
  microsoftId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
