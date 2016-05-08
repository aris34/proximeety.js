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

    mongoose.model('Message').find({ _senderId: _senderId},
        function (err, messages) {
            if(err) {
                res.json(err);
            }
            else {
                if(messages != null) {
                    console.log("Found");

                    res.format({
                        // HTML response will render the index.jade file in the views/profiles folder
                        // 'profiles' is set to be an accessible variable in the jade view
                        html: function(){
                            function Contact(message, username) {
                                this.message = message;
                                this.username = username;
                            }
                            var contacts = {};

                            var index = 0;

                            if(messages.length == 0) {
                                res.render('messages/index', {
                                    title: 'Messages',
                                    "id" : _senderId,
                                    "messages" : messages,
                                    "contacts" : contacts,
                                    "message" : 'This user has not sent any messages'
                                });
                            }
                            for(var i in messages)
                                console.log('Message: ' + i + '. ' + messages[i]);

                            var maxIndex = messages.length;
                            counter = 0;

                            for(var c in messages) {

                                var createContact = function(username, message, index) {
                                    var tempMessage = new Contact(message, username);
                                    //console.log('tempContact: ' + tempContact.connection._user2Id + ' ' + tempContact.username + ' i: ' + index);
                                    contacts[index] = tempMessage;
                                    counter++;

                                    if(counter == maxIndex) {
                                        res.render('messages/index', {
                                            title: 'Messages',
                                            "id" : _senderId,
                                            "messages" : messages,
                                            "contacts" : contacts,
                                            "send_receive" : 'to'
                                        });
                                    }
                                };

                                var getUsername = function(callback) {
                                    // Get usernames of profiles in connection from database
                                    var searchId = messages[c]._recipientId;
                                    var i = c;
                                    var username = '';
                                    console.log('Searching for profile with id: ' + searchId);
                                    mongoose.model('Profile').findById(searchId, function (err, profile) {
                                        if(profile != null) {
                                            username = profile.username;
                                            callback(username, messages[i], i);
                                        } else {
                                            username = 'Username not found/deleted. id: ' + searchId;
                                            callback(username, messages[i], i);
                                        }
                                    });
                                };

                                getUsername(createContact);
                            }
                        },
                        // JSON response shows all profiles in JSON format
                        json: function(){
                          res.json(messages);
                        }
                    });
                }
                else {
                    console.log("Not found");
                    res.json({ _id : "-1" });
                }
            }
        });
});

/********** GET all messages with specific recipient **********/
router.get('/conversation/recipientId=:recipient', function(req,res) {
    console.log('GET conversation: ' + req.params.sender);

    var _recipientId = req.params.recipient;

    mongoose.model('Message').find({ _recipientId: _recipientId},
 
        function (err, messages) {
            if(err) {
                res.json(err);
            }
            else {
                if(messages != null) {
                    console.log("Found");

                    res.format({
                        // HTML response will render the index.jade file in the views/profiles folder
                        // 'profiles' is set to be an accessible variable in the jade view
                        html: function(){
                            function Contact(message, username) {
                                this.message = message;
                                this.username = username;
                            }
                            var contacts = {};

                            var index = 0;

                            if(messages.length == 0) {
                                res.render('messages/index', {
                                    title: 'Messages',
                                    "id" : _recipientId,
                                    "messages" : messages,
                                    "contacts" : contacts,
                                    "message" : 'This user has not sent any messages',
                                    "send_receive" : 'to',
                                    "username" : _recipientId
                                });
                            }
                            for(var i in messages)
                                console.log('Message: ' + i + '. ' + messages[i]);

                            var maxIndex = messages.length;
                            var counter = 0;

                            for(var c in messages) {

                                var createContact = function(myUsername, otherUsername, message, index) {
                                    var tempMessage = new Contact(message, otherUsername);
                                    //console.log('tempContact: ' + tempContact.connection._user2Id + ' ' + tempContact.username + ' i: ' + index);
                                    contacts[index] = tempMessage;
                                    counter++;

                                    if(counter == maxIndex) {
                                        res.render('messages/index', {
                                            title: 'Messages',
                                            "id" : _recipientId,
                                            "messages" : messages,
                                            "contacts" : contacts,
                                            "send_receive" : 'to',
                                            "username" : myUsername
                                        });
                                    }
                                };

                                var getAllUsernames = function(callback, myUsername) {
                                    // Get usernames of profiles in connection from database
                                    var searchId = messages[c]._senderId;
                                    var i = c;
                                    var otherUsername = '';
                                    
                                    mongoose.model('Profile').findById(searchId, function (err, profile) {
                                        if(profile != null) {
                                            username = profile.username;
                                            callback(myUsername, otherUsername, messages[i], i);
                                        } else {
                                            username = 'Username not found/deleted. id: ' + searchId;
                                            callback(myUsername, otherUsername, messages[i], i);
                                        }
                                    });
                                };

                                //getAllUsernames(createContact);
                                var getMyUsername = function() {
                                    mongoose.model('Profile').findById(_recipientId, function (err, profile) {
                                        var myUsername = profile.username;
                                        getAllUsernames(createContact, myUsername);
                                    });
                                }

                                getMyUsername();
                            }
                        },
                        // JSON response shows all profiles in JSON format
                        json: function(){
                          res.json(messages);
                        }
                    });
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