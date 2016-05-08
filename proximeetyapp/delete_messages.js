// Get the mongoose module
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    _senderId:      { type: Schema.Types.ObjectId, ref: 'Profile' },
    _recipientId:   { type: Schema.Types.ObjectId, ref: 'Profile' },
    messageText:	String,
    timeSent:    	String,
});

var Message = mongoose.model('Message', messageSchema);

Message.find({}, function(err, messages) {
    for(var i in messages) {
        console.log(i + ". " + messages[i]);
        //messages[i].remove();
    }
});

Message.find({_senderId : '56e95d58313609d8446b6c25'}, function(err, messages) {
    for(var i in messages) {
        console.log(i + ". " + messages[i]);
        //connections[i].remove();
    }
});

Message.find({_recipientId : '56e95d58313609d8446b6c25'}, function(err, messages) {
    for(var i in messages) {
        console.log(i + ". " + messages[i]);
        //connections[i].remove();
    }
});