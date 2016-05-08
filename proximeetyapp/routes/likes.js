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

/********** GET All Likes with specific ownerId **********/
router.get('/ownerId=:ownerId', function(req,res) {
    var _ownerId = req.params.ownerId;

    console.log('GET - All likes for id: ' + _ownerId);

    mongoose.model('Like').find({ _ownerId: _ownerId},
        function (err, likes) {
            if(err) {
                res.json(err);
            }
            else
            {
                if(likes.length == 0) {
                    res.render('likes/index', {
                        title: 'Whispers liked by user',
                        "id" : _ownerId,
                        "whispers" : "",
                        "message" : 'This user has not liked any whispers',
                        "username" : _ownerId
                    });
                }

                function Whisper(clue, like) {
                    this.clue = clue;
                    this.like = like;
                }   

                var index = 0;
                var whispers = {};
                var maxIndex = likes.length;
                var counter = 0;

                for(var i in likes)
                    console.log('Like: ' + i + '. ' + likes[i]);

                
                for(var l in likes) {

                    var createWhisper = function(clue, like, index) {
                        var tempWhisper = new Whisper(clue, like);
                        whispers[index] = tempWhisper;

                        counter++;
                        if(counter == maxIndex) {
                            res.render('likes/index', {
                                title: 'Whispers liked by user',
                                "id" : _ownerId,
                                "whispers" : whispers,
                                "username" : _ownerId
                            });
                        }
                    };

                    var getClues = function(callback){
                        var searchId = likes[l]._clueId;
                        var i = l;

                        mongoose.model('Clue').findById(searchId, function (err, clue) {
                            console.log('clue: ' + clue.question + clue.answer);
                            callback(clue, likes[l], i);
                        });
                    };

                    getClues(createWhisper);

                }
            }
        }
    );

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

module.exports = router;