const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'username is required'],
    trim: true
  },
  bio: String,
  profile_img: {
    type: String,
    default: 'https://ik.imagekit.io/vu8sp3yvf/insta_clone/vecteezy_default-male-avatar-profile-icon-social-media-chatting_25337669.jpg?updatedAt=1792690330587'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
