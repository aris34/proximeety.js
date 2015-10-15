var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

var clueSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    question:       String,
    answer:         String,
    orderNumber:    Number,
    updated:        { type: Date, default: Date.now }
});

// Create the Clue model
Clue = mongoose.model('Clue', clueSchema);

Clue.find({}, function(err, clues) {
    var i=0;
    for(var i in clues) {
        console.log(i + ". " + clues[i]._ownerId + " " + clues[i].question + " " + clues[i].answer);
        //clues[i].remove();
    }
    console.log("i: ", i);
});

Clue.find({}, function(err, clues) {
    var i=0;
    for(var i in clues) {
        console.log(i + ". " + clues[i]._ownerId + " " + clues[i].question + " " + clues[i].answer);
        clues[i].remove();
    }
    console.log("i: ", i);
});


