const mongoose = require('mongoose');

// Define the schema for a blog post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Must provide a title
    trim: true // Remove extra spaces
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a User model (we'll add later)
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to current time
  },
  updatedAt: {
    type: Date
  }
});

// Export the model for use in other files
module.exports = mongoose.model('Post', postSchema);
