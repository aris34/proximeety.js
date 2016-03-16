var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

var achievementSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    type:         	String,
    title:			String,
    text:			String,
    rank:			Number,
    date:			String
});

// Create the Achievement model
Achievement = mongoose.model('Achievement', achievementSchema);

Achievement.find({}, function(err, achievements) {
    var i=0;
    for(var i in achievements) {
        console.log(i + ". " + achievements[i]);
        achievements[i].remove();
    }
});

Achievement.find({}, function(err, achievements) {
    var i=0;
    for(var i in achievements) {
        console.log(i + ". " + achievements[i]);
        //achievements[i].remove();
    }
});