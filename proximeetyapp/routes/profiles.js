// Defining needed packages
var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose'),                 // mongo connection
    bodyParser = require('body-parser'),            // parses information from POST
    methodOverride = require('method-override');    // used to manipulate POST


// Any requests to this controller must pass through the 'use' function
// Source: method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


// REST operations for profiles

// GET all profiles
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
                      res.render('profiles/index', {
                          title: 'Profiles',
                          "profiles" : profiles
                      });
                  },
                  // JSON response shows all profiles in JSON format
                  json: function(){
                      res.json(infophotos);     // ??????
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

    // Call the 'create' function for the database
    mongoose.model('Profile').create({
        username: username,
        email: email,
        password: password
    }, function (err, profile) {
        if (err) {
            res.send("Problem occured while adding information to the database (profile).");
        }
        else {
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
router.param('id', function(req, res, next, id) {
    console.log('Validating that id: ' + id + ' exists...');
    
    // Find the ID in the database
    mongoose.model('Profile').findById(id, function (err, profile) {
        // If id is not found, respond with 404
        if(err) {
            console.log('id: ' + id + ' was not found.');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                },
                json: function(){
                    res.json({ message : err.status + ' ' + err});
                }
            });
        // If id is found, continue
        }
        else
        {
            console.log(profile);
            // Once validation is done, save the new item in the req
            req.id = id;
            // go to next
            next();
        }
    });
});

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

// GET and update an individual profile by MongoDB
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
    
    // Find the document by ID
    mongoose.model('Profile').findById(req.id, function (err, profile) {
        // Update the document
        profile.update({
            username: username,
            email: email,
            password: password
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
                
































