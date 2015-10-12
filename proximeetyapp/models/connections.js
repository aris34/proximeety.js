// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionSchema = Schema({
	_user1Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	_user2Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	timesMet: 	{ type: Number, default: 0 },
	lastMet: 	{ type: Date },
	lastUpdate: { type: Date }
});

// Create the Connections model
mongoose.model('Connection', connectionSchema);