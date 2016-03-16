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

/********** GET All Likes **********/
router.get('/', function(req,res) {
	console.log('GET - All likes');

	res.json('OK');
});

/********** POST a new Like **********/
router.post('/', function(req, res) {
    console.log('likes/ - POST: ' + req.body._clueId);
    
    // Get values from POST request (through forms or REST calls).
    var _ownerId = req.body._ownerId;
    var _clueId = req.body._clueId;
    var date = req.body.date;
    
    // Call the 'create' function for the database
    mongoose.model('Like').create({
        _ownerId:       _ownerId,
        _clueId:        _clueId,
        date:           date
    }, function (err, like) {
        if (err) {
            res.send('Error while adding information to the database (like).');
        }
        else {
            console.log('Added new like with id: ' + like._id);
            res.json(like);
        }
    });
});