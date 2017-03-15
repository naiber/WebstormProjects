/**
 * Created by MicheleSpinello on 29/11/2016.
 */
const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    email: Array
});

var User = mongoose.model('User',userSchema);
module.export = User;