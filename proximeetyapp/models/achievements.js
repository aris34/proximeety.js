// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    type:         	String,
    title:			String,
    text:			String,
    rank:			Number,
    date:			String
});

// Create the Achievement model
mongoose.model('Achievement', achievementSchema);