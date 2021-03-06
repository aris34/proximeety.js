var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

var clueSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    question:       String,
    answer:         String,
    orderNumber:    Number,
    updated:        String,
    likes:          Number
});

// Create the Clue model
Clue = mongoose.model('Clue', clueSchema);

Clue.find({}, function(err, clues) {
    for(var i in clues) {
        console.log(i + ". " + clues[i]);
        //clues[i].remove();
    }
});

Clue.find({ _ownerId : '570dece0b5ef48ed1c63d5aa'}, function(err, clues) {
    var i=0;
    for(var i in clues) {
        console.log(i + ". " + clues[i]);
        //clues[i].remove();
    }
});

Clue.find({ _id : '56e95fb7313609d8446b6c27'}, function(err, clues) {
    var i=0;
    for(var i in clues) {
        console.log(i + ". " + clues[i]);
        //clues[i].remove();
    }
});

Clue.findById('56f3d4f8abd66b6e765cdabf', function (err, clue) {
        // Update the document
        clue.update({
            likes: 11
        }, function (err, clueID) {
            if (err) {
                console.log("There was a problem updating the information to the database: " + err);
            }
            else {
                console.log("Update OK");
            }
        })
});
