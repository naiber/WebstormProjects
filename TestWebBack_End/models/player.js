/**
 * Created by MicheleSpinello on 21/12/2016.
 */
var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    name:String,
    surname:String,
    numShirt:{type: Number , unique:true , required:true, min:1 , max:99},
    role:{type:String,toUpperCase:true,maxlength:3},
    birthDate:{type:Date}
});

var Player = mongoose.model('Player',playerSchema);

module.exports = Player;