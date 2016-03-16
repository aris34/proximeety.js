// Defining needed packages
var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose'),                 // mongo connection
    bodyParser = require('body-parser'),            // parses information from POST
    methodOverride = require('method-override');    // used to manipulate POST

// Any requests to this controller must pass through the 'use' function
// Source: method-override
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

/********** GET All Messages **********/
router.get('/', function(req,res) {
	console.log('GET - All Messages');

	res.json('OK');
});

/********** GET all messages with specific sender and recipient **********/
router.get('/conversation/senderId=:sender&recipientId=:recipient', function(req,res) {
	console.log('GET conversation: ' + req.params.sender + ' ' + req.params.recipient);

	var _senderId = req.params.sender;
	var _recipientId = req.params.recipient;

	

	mongoose.model('Message').find( { $or: [ { $and: [ { _senderId: _senderId }, { _recipientId: _recipientId } ] }, { $and: [ { _senderId: _recipientId }, { _recipientId: _senderId } ] } ] },

	 //$or: [ { $and: [ { _senderId: _senderId }, { _recipientId: _recipientId } ] }, { $and: [ { _senderId: _recipientId }, { _recipientId: _senderId } ] },
		
		function (err, message) {
			if(err) {
				res.json(err);
			}
			else {
				if(message != null) {
                	console.log("Found");
                	res.json(message);
	            }
	            else {
	                console.log("Not found");
	                res.json({ _id : "-1" });
	            }
			}
		});

});

/********** GET all messages with specific sender **********/
router.get('/conversation/senderId=:sender', function(req,res) {
    console.log('GET conversation: ' + req.params.sender);

    var _senderId = req.params.sender;

    mongoose.model('Message').find({ _senderId: senderId},

        function (err, message) {
            if(err) {
                res.json(err);
            }
            else {
                if(message != null) {
                    console.log("Found");
                    res.json(message);
                }
                else {
                    console.log("Not found");
                    res.json({ _id : "-1" });
                }
            }
        });
});

/********** GET all messages with specific recipient **********/
router.get('/conversation/senderId=:recipient', function(req,res) {
    console.log('GET conversation: ' + req.params.sender);

    var _recipientId = req.params.recipient;

    mongoose.model('Message').find({ _recipientId: recipientId},
 
        function (err, message) {
            if(err) {
                res.json(err);
            }
            else {
                if(message != null) {
                    console.log("Found");
                    res.json(message);
                }
                else {
                    console.log("Not found");
                    res.json({ _id : "-1" });
                }
            }
        });
});

/********** POST a new Message **********/
router.post('/', function(req, res) {
    console.log('messages/ - POST: ' + req.body.messageText);
    
    // Get values from POST request (through forms or REST calls).
    var _senderId = req.body._senderId;
    var _recipientId = req.body._recipientId;
    var messageText = req.body.messageText;
    var timeSent = req.body.timeSent;
    
    // Call the 'create' function for the database
    mongoose.model('Message').create({
        _senderId:		_senderId,
        _recipientId:	_recipientId,
        messageText:	messageText,
        timeSent:		timeSent
    }, function (err, message) {
        if (err) {
            res.send('Error while adding information to the database (message).');
        }
        else {
            console.log('Added new message with id: ' + message._id + ' with sender: ' + message._senderId);
            res.json(message);
        }
    });
});



module.exports = router;