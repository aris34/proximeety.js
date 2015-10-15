// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clueSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    question:       String,
    answer:         String,
    orderNumber:    Number,
    updated:        String
});

// Create the Clue model
mongoose.model('Clue', clueSchema);