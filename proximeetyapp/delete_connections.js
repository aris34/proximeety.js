var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;


var connectionSchema = Schema({
    _user1Id:   { type: Schema.Types.ObjectId, ref: 'Profile' },
    _user2Id:   { type: Schema.Types.ObjectId, ref: 'Profile' },
    timesMet:   { type: Number, default: 0 },
    faceToFace: { type: Number, default: 0 },
    lastFaceToFace: String,
    lastMet:    String,
    lastUpdate: String
});

// Create the Connections model
var Connection = mongoose.model('Connection', connectionSchema);

Connection.find({}, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
        connections[i].remove();
    }
});

Connection.find({}, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
        //connections[i].remove();
    }
});