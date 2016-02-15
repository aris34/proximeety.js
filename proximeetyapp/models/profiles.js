// Schema and model for the Users of the app

// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create the profileSchema
var profileSchema = Schema({
    username: { type: String, unique : true },
    password: String,
    deviceId: String,
    clues: Number,
    active: String
});

// Create the Profile model
mongoose.model('Profile', profileSchema);