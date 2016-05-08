var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proximeetyappdb');
var Schema = mongoose.Schema;

var likeSchema = Schema({
    _ownerId:       { type: Schema.Types.ObjectId, ref: 'Profile' },
    _clueId:       	{ type: Schema.Types.ObjectId, ref: 'Clue' },
    date:         String
});

// Create the Like model
Like = mongoose.model('Like', likeSchema);

// Like.find({}, function(err, likes) {
//     var i=0;
//     for(var i in likes) {
//         console.log(i + ". " + likes[i]);
//         likes[i].remove();
//     }
// });


Like.find({}, function(err, likes) {
    for(var i in likes) {
        console.log(i + ". " + likes[i]);
        //likes[i].remove();
    }
});

Like.find({_ownerId : '56e95d58313609d8446b6c25'}, function(err, likes) {
    var i=0;
    for(var i in likes) {
        console.log(i + ". " + likes[i]);
        likes[i].remove();
    }
});