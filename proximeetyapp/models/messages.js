// Get the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    _senderId:      { type: Schema.Types.ObjectId, ref: 'Profile' },
    _recipientId:   { type: Schema.Types.ObjectId, ref: 'Profile' },
    messageText:	String,
    timeSent:    	String,
});

// Create the Message model
mongoose.model('Message', messageSchema);