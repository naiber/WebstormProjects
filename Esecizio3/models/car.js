const mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    name:String,
    brand:String,
    year:{type: Date}
});

var Car = mongoose.model('Car',carSchema);

module.exports = Car;