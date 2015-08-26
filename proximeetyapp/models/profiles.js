// Schema and model for the Users of the app

// Get the mongoose module
var mongoose = require('mongoose');

// Create the Schema
var profileSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Create the model
mongoose.model('Profile', profileSchema);

console.log('/models/profiles.js profileSchema and Profile model created.');