var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

// Create the profileSchema
var profileSchema = Schema({
    username: { type: String, unique : true },
    password: String,
    deviceId: String,
    clues: Number,
    active: String
});

var Profile = mongoose.model('Profile', profileSchema);

Profile.find({}, function(err, profiles) {
    for(var i in profiles) {
        console.log(i + ". " + profiles[i]);
        profiles[i].remove();
    }
});

Profile.find({}, function(err, profiles) {
    for(var i in profiles) {
        console.log(i + ". " + profiles[i]);
        //profiles[i].remove();
    }
});