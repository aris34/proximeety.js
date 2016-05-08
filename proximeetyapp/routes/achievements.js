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

/********** GET All Achievements with specific _ownerId **********/
router.get('/:ownerId', function(req,res) {
    var _ownerId = req.params.ownerId;
    console.log('GET - All Achievements for: ' + _ownerId);

    mongoose.model('Achievement').find({ _ownerId : _ownerId}, 
        function(err, achievements) {
            if(err) {
                res.json(err);
            }
            else {

                if(achievements.length == 0) {
                    res.render('achievements/index', {
                        title: 'Achievements for user',
                        "id" : _ownerId,
                        "achievements" : "",
                        "message" : 'This user has not unlocked any achievements',
                        "username" : _ownerId
                    });
                }
                else {
                    res.render('achievements/index', {
                        title: 'Achievements for user',
                        "id" : _ownerId,
                        "achievements" : achievements,
                        "message" : "",
                        "username" : _ownerId
                    });
                }
            }
        }
    );
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

module.exports = router;