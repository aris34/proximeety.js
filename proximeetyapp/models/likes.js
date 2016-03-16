// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    _clueId:       	{ type: Schema.Types.ObjectId, ref: 'Clue' },
    date:         String
});

// Create the Like model
mongoose.model('Like', likeSchema);