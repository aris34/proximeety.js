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

// REST operations for clues

/********** GET New Clue page. **********/
router.get('/new/:id', function(req, res) {
    console.log('clues/new/:id - GET, req: ' + req.params.id);
    
    //var ownerId = req.params.id;
    
    
    res.render('clues/new', { title: 'Add new clue for ',
                             ownerId: req.params.id
                            });
});

/********** POST a new Clue **********/
//router.route('/').post(function(req, res) {
router.post('/', function(req, res) {
    console.log('clues/ - POST');
    
    // Get values from POST request (through forms or REST calls).
    var question = req.body.question;
    var answer = req.body.answer;
    var ownerId = req.body.ownerId;
    var orderNumber = req.body.orderNumber;
    
    // Call the 'create' function for the database
    mongoose.model('Clue').create({
        _ownerId:       ownerId,
        question:       question,
        answer:         answer,
        orderNumber:    orderNumber
    }, function (err, clue) {
        if (err) {
            res.send('Error while adding information to the database (clue).');
        }
        else {
            console.log('Added new clue with id: ' + clue._id + ' for profile: ' + clue._ownerId);
            res.json(clue);
        }
    });
});

/********** Show clues with specific _ownerId **********/
router.get('/ownerId=:id', function (req, res) {
    console.log('/ownerId=:id - GET');
    
    var ownerId = req.params.id;
    
    // Find all clues with _ownerId = ownerId
    mongoose.model('Clue').find({ _ownerId: ownerId}, function (err, clues) {
        if (err) {
            return console.error(err);
        } else {
            // Respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
            res.format({
                // HTML response will render the index.jade file in the views/profiles folder
                // 'profiles' is set to be an accessible variable in the jade view
                html: function(){
                  res.render('clues/index', {
                      title: 'Clues for profile: ' + ownerId,
                      "clues" : clues
                  });
                },
                // JSON response shows all profiles in JSON format
                json: function(){
                  //res.json(infophotos);     // ??????
                }
        });
        }
    }).sort('orderNumber');
    
});

/********** DELETE a clue with a specific id **********/
router.delete('/:id/delete', function (req, res){
    console.log('router.delete /:id/delete ' + req.params.id);

    // find clue by ID
    mongoose.model('Clue').findById(req.params.id, function (err, clue) {
        if (err) {
            return console.error(err);
        }
        else {
            // Remove clue from the database
            clue.remove(function (err, clue) {
                if (err) {
                    return console.error(err);
                }
                else {
                    // Return success message saying profile was deleted
                    console.log('DELETE removing clue with ID: ' + clue._id);
                    res.format({
                        // HTML returns to the main page
                        html: function(){
                            res.redirect("/profiles");
                        },
                        // JSON returns the item with the message that it has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                      item : clue
                                     });
                        }
                    });
                }
            });
        }
    });
});
    
    
    
    
module.exports = router;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    