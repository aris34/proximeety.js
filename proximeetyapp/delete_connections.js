var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

var connectionSchema = Schema({
	_user1Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	_user2Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	timesMet: 	Number,
	lastMet: 	{ type: Date, default: Date.now }
});

// Create the Connections model
var Connection = mongoose.model('Connection', connectionSchema);

Connection.find({}, function(err, connections) {
    for(var i in connections) {
        console.log(i + ". " + connections[i]);
    }
});