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
    lastUpdate: String,
    blocked:    String
});

// Create the Connections model
var Connection = mongoose.model('Connection', connectionSchema);

Connection.find({}, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
        //connections[i].remove();
    }
});

Connection.find({}, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
        //connections[i].remove();
    }
});

Connection.find({ _user2Id : '57044d9bd4112b5ba33ecf4c'}, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
        //connections[i].remove();
    }
});

Connection.find( {$or: [{ _user1Id : '56e9018a313609d8446b6bec'}, { _user2Id : '56e9018a313609d8446b6bec'}] }, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
    }
});

Connection.findById('570d595855a0a52f9b570136', function (err, connection) {
        // Update the document
        connection.update({
            faceToFace: 0
        }, function (err, connectionID) {
            if (err) {
                console.log("There was a problem updating the information to the database: " + err);
            }
            else {
                console.log("Update OK");
            }
        })
});