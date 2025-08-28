const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for JSON parsing (placed early for all routes)
app.use(express.json());

// Mount routes (before database connection for proper order)
app.use('/api/posts', require('./routes/posts'));

// Connect to MongoDB (after middleware/routes, before listening)
mongoose.connect('mongodb://localhost:27017/blog_api')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on failure to prevent running without DB
  });

// Root route for testing
app.get('/', (req, res) => res.send('Blog API is running!'));

// Global error handler (catches unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server (after everything is set up)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
