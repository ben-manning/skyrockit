const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Routes
// GET /users/:userId/applications
// index route
router.get('/', async (req, res) => {
  try {
    res.render('applications/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /users/:userId/applications/new
router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

// POST /users/:userId/applications
router.post('/', async (req, res) => {
  try {
    // E
    const currentUser = await User.findById(req.session.user._id);
    // T
    currentUser.applications.push(req.body);
    // L
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
  
});



module.exports = router;