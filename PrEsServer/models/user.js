/**
 * Created by MicheleSpinello on 15/02/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:String,
    surname:String,
    birthDate:{type:Date}
});

var User = mongoose.model('User',userSchema);

module.exports = User;