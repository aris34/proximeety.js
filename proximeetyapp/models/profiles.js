// Schema and model for the Users of the app

// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create the profileSchema
var profileSchema = Schema({
    username: String,
    password: String,
    deviceId: String,
    clues: [{type: Schema.Types.ObjectId, ref: 'Clue' }]
});

// Create the Profile model
mongoose.model('Profile', profileSchema);