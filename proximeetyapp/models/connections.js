// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionSchema = Schema({
	_user1Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	_user2Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	timesMet: 	Number,
	lastMet: 	{ type: Date, default: Date.now }
});

// Create the Connections model
mongoose.model('Connection', connectionSchema);