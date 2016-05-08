var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

// Create the profileSchema
var profileSchema = Schema({
    username: { type: String, unique : true },
    password: String,
    deviceId: String,
    clues: Number,
    active: String,
    email: String,
    age: Number,
    gender: String,
    community: String
});

var Profile = mongoose.model('Profile', profileSchema);

// Profile.find({}, function(err, profiles) {
//     for(var i in profiles) {
//         console.log(i + ". " + profiles[i]);
//         profiles[i].remove();
//     }
// });

Profile.find({}, function(err, profiles) {
    for(var i in profiles) {
        console.log(i + ". " + profiles[i]);
        //profiles[i].remove();
    }
});

Profile.find({ username : 'dr. HCI' }, function(err, profiles) {
    for(var i in profiles) {
        console.log(i + ". " + profiles[i]);
        //profiles[i].remove();
    }
});

Profile.find({ _id : '56e91efb313609d8446b6bff' }, function(err, profiles) {
    for(var i in profiles) {
        console.log(i + ". " + profiles[i]);
        //profiles[i].remove();
    }
});

Profile.find({ deviceId : '64:89:9A:A2:71:C7' }, function(err, profiles) {
    for(var i in profiles) {
        console.log(i + ". " + profiles[i]);
        //profiles[i].remove();
    }
});



Profile.findById('57044d9bd4112b5ba33ecf4c', function (err, profile) {
        // Update the document
        profile.update({
            clues: 0
        }, function (err, profileID) {
            if (err) {
                console.log("There was a problem updating the information to the database: " + err);
            }
            else {
                console.log("Update OK");
            }
        })
});