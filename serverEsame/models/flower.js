/**
 * Created by MicheleSpinello on 22/02/2017.
 */
var mongoose = require('mongoose');

var flowerSchema = mongoose.Schema({
    name:String,
    nPetal:Number,
    colour:String
});

var Flower = mongoose.model('Flower',flowerSchema);

module.exports = Flower;