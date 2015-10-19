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


// REST operations for profiles

/************ GET all profiles ************/
router.route('/').get(function(req, res, next) {
    console.log('route/.get');

    // retrieve all profiles from Mongo
    mongoose.model('Profile').find({}, function (err, profiles) {
        if (err) {
              return console.error(err);
        } 
        else {
              // Respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
              res.format({
                  // HTML response will render the index.jade file in the views/profiles folder
                  // 'profiles' is set to be an accessible variable in the jade view
                  html: function(){
                    console.log('HTML response');
                    res.render('profiles/index', {
                          title: 'Profiles',
                          "profiles" : profiles
                      });
                  },
                  // JSON response shows all profiles in JSON format
                  json: function(){
                    console.log('JSON response');
                    res.json(profiles); 
                  }
            });
          }
    });
});

// POST a new profile
router.route('/').post(function(req, res) {
    console.log('route/.post');

    // Get values from POST request (through forms or REST calls).
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var deviceId = req.body.deviceId;
    var active = req.body.active;

    // Call the 'create' function for the database
    mongoose.model('Profile').create({
        username: username,
        email: email,
        password: password,
        deviceId : deviceId,
        active : active
    }, function (err, profile) {
        if (err) {
            console.log("Problem while creating new profile.");

            // Find the username in the database
            mongoose.model('Profile').find({username: username}, function (err, profile) {
                // If username is not found
                if(err) {
                    console.log('username: ' + username + ' was not found.');
                }
                // If id is found, send appropriate JSON response
                else
                {
                    res.json({
                        _id : "-1"
                    });
                }
            });
        }
        else {
            console.log('POST creating new profile, profile.deviceId: ' + profile.deviceId);
            // Profile has been created
            console.log('POST creating new profile: ' + profile);

            // Respond to HTML and JSON
            res.format({
                // HTML response will set the location and redirect back to the home page.
                html: function(){
                    // If worked, set header so that address bar doesn't still say /adduser
                    res.location("profiles");
                    // Forward to success page
                    res.redirect("/profiles");
                },
                // JSON response shows newly created profile
                json: function(){
                    res.json(profile);
                }
            });
        }
    })
});

/* GET New Profile page. */
router.get('/new', function(req, res) {
    console.log('router.get /new');
    res.render('profiles/new', { title: 'Add New Profile' });
});

// Route middleware to validate :id
// router.param('id', function(req, res, next, id) {
//     console.log('Validating that id: ' + id + ' exists...');
    
//     // Find the ID in the database
//     mongoose.model('Profile').findById(id, function (err, profile) {
//         // If id is not found, respond with 404
//         if(err) {
//             console.log('id: ' + id + ' was not found.');
//             res.status(404)
//             var err = new Error('Not Found');
//             err.status = 404;
//             res.format({
//                 html: function(){
//                     next(err);
//                 },
//                 json: function(){
//                     res.json({ message : err.status + ' ' + err});
//                 }
//             });
//         // If id is found, continue
//         }
//         else
//         {
//             console.log(profile);
//             // Once validation is done, save the new item in the req
//             req.id = id;
//             // go to next
//             next();
//         }
//     });
// });

// GET an individual profile by ID and display it
router.route('/:id').get(function(req, res) {
    console.log('route /:id .get');

    mongoose.model('Profile').findById(req.id, function (err, profile) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } 
        else {
            console.log('GET Retrieving ID: ' + profile._id);
            res.format({
                html: function(){
                    res.render('profiles/show', {
                        "profile" : profile
                    });
                },
                json: function() {
                    res.json(profile);
                }
            });
        }
    });
});

// Search by username and password and return the profile if found
router.get('/login/:username/:password', function (req, res) {
    console.log('/profiles/login/ ' + req.params.username + " " + req.params.password);
    var username = req.params.username;
    var password = req.params.password;

    // Search the database for a profile with username and password
    mongoose.model('Profile').findOne( {username: username }, function (err, profile) {
        if(err) {
            console.log("Error");
        }
        else {
            if(profile != null && profile.password === password) {
                console.log("Found");
                res.json(profile);
            }
            else {
                console.log("Not found");
                res.json({
                        _id : "-1"
                });
            }
        }
    });
});

// Search Profile by username only and return the profile if found
router.get('/login/:username', function (req, res) {
    console.log('/profiles/login/ ' + req.params.username);
    var username = req.params.username;

    // Search the database for a profile with username and password
    mongoose.model('Profile').findOne( {username: username }, function (err, profile) {
        if(err) {
            console.log("Error");
        }
        else {
            if(profile != null) {
                console.log("Found");
                res.json(profile);
            }
            else {
                console.log("Not found");
                res.json({
                        _id : "-1"
                });
            }
        }
    });
});

// Search Profile by deviceId only and return the profile if found
router.get('/deviceId/:deviceId', function (req, res) {
    console.log('/profiles/ Search by deviceId ' + req.params.deviceId);
    var deviceId = req.params.deviceId;

    // Search the database for a profile with username and password
    mongoose.model('Profile').findOne( {deviceId: deviceId }, function (err, profile) {
        if(err) {
            console.log("Error");
        }
        else {
            if(profile != null) {
                console.log("Found");
                profile.password = "";
                res.json(profile);
            }
            else {
                console.log("Not found");
                res.json({
                        _id : "-1"
                });
            }
        }
    });
});

// GET and edit an individual profile by MongoDB
router.get('/:id/edit', function(req, res) {
    console.log('router.get /:id/edit');
    
    // Search for the profile in MongoDB
    mongoose.model('Profile').findById(req.id, function (err, profile) {
        if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
        } 
        else {
            // Return the profile
            console.log('GET Retrieving ID: ' + profile._id);
            res.format({
                // The HTML response will render the 'edit.jade' template
                html: function() {
                    res.render('profiles/edit', {
                        title: 'Profile ' + profile._id,
                        "profile" : profile
                    });
                },
                // JSON response will return the JSON output
                json: function(){
                    res.json(profile);
                }
            });
        }
    });
});



// PUT to update a profile by ID
router.put('/:id/edit', function(req, res) {
    console.log('router.put /:id/edit');
    
    // Get values from POST request (through forms or REST calls).
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var active = req.body.active;
    
    // Find the document by ID
    mongoose.model('Profile').findById(req.id, function (err, profile) {
        // Update the document
        profile.update({
            username: username,
            email: email,
            password: password,
            active: active
        }, function (err, profileID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            else {
                      //HTML responds by going back to the page
                      res.format({
                          html: function(){
                               res.redirect("/profiles/" + profile._id);
                         },
                         //JSON responds showing the updated values
                        json: function(){
                            console.log("Sending JSON response: " + profile);
                               res.json(profile);
                         }
                      });
            }
        })
    });
});

// DELETE a profile by ID
router.delete('/:id/delete', function (req, res){
    console.log('router.delete /:id/delete');
    
    // find profile by ID
    mongoose.model('Profile').findById(req.id, function (err, profile) {
        if (err) {
            return console.error(err);
        }
        else {
            // Remove profile from the database
            profile.remove(function (err, profile) {
                if (err) {
                    return console.error(err);
                }
                else {
                    // Return success message saying profile was deleted
                    console.log('DELETE removing profile with ID: ' + profile._id);
                    res.format({
                        // HTML returns to the main page
                        html: function(){
                            res.redirect("/profiles");
                        },
                        // JSON returns the item with the message that it has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                      item : profile
                                     });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
                
































