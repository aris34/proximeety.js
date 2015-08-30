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

/********** GET All Connections **********/
router.get('/', function(req,res) {
	console.log('GET - All Connections');

	res.json('OK');
});

/********** GET All Connections with userId **********/
router.get('/userId=:id', function(req,res) {
	console.log('GET - All Connections for userId= ' + req.params.id);

	var userId = req.params.id;

	mongoose.model('Connection').find( { $or: [ { _user1Id: userId }, { _user2Id: userId } ] },
		function (err, connection) {
			if(err) {
				console.log('Error while getting connection' + err);
				res.send(err);
			} else {
				res.json(connection);
			}
		});
});

/********** GET One Connection **********/
router.get('/:id', function(req,res) {
	console.log('GET - One connection with id= ' + req.params.id);

	res.json('OK');
});


/********** POST a new Connection **********/
router.post('/', function(req, res) {
	console.log('POST - Connections');

	// Get values from POST request
	var _user1Id = req.body._user1Id;
	var _user2Id = req.body._user2Id;
	var timesMet = req.body.timesMet;
	//var lastMet = req.body.lastMet;

	console.log(_user1Id + ' ' + _user2Id, ' ' + timesMet );

	// Call the 'create' function for the database
    mongoose.model('Connection').create({
    	_user1Id : _user1Id,
    	_user2Id : _user2Id,
    	timesMet : timesMet
    }, function (err, connection) {
    	if(err) {
    		console.log('Error while creating a connection' + err);
    		res.json({_id : "-1"});
    	} else {
    		console.log('Added new connection');
    		res.json(connection);
    	}
    });
});
















module.exports = router;