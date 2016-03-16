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

/********** GET All Achievements **********/
router.get('/', function(req,res) {
	console.log('GET - All Achievements');

	res.json('OK');
});

/********** POST a new Achievement **********/
router.post('/', function(req, res) {
    console.log('achievements/ - POST: ' + req.body.text);
    
    // Get values from POST request (through forms or REST calls).
    var _ownerId = req.body._ownerId;
    var type = req.body.type;
    var title = req.body.title;
    var text = req.body.text;
    var rank = req.body.rank;
    var date = req.body.date;
    
    // Call the 'create' function for the database
    mongoose.model('Achievement').create({
        _ownerId:       _ownerId,
        type:        type,
        title:           title,
        text:   text,
        rank:   rank,
        date:   date
    }, function (err, achievement) {
        if (err) {
            res.send('Error while adding information to the database (achievement).');
        }
        else {
            console.log('Added new achievement with id: ' + achievement._id);
            res.json(achievement);
        }
    });
});