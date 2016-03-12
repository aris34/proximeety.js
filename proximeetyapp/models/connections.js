// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionSchema = Schema({
	_user1Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	_user2Id: 	{ type: Schema.Types.ObjectId, ref: 'Profile' },
	timesMet: 	{ type: Number, default: 0 },
	faceToFace: { type: Number, default: 0 },
	lastFaceToFace: String,
	lastMet: 	String,
	lastUpdate: String,
	blocked:	String
});

// Create the Connections model
mongoose.model('Connection', connectionSchema);