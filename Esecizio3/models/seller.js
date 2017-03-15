/**
 * Created by MicheleSpinello on 07/12/2016.
 */
const mongoose=require('mongoose');

var sellerSchema = mongoose.Schema({
    name:String,
    address:String,
    phone:number,
    cars:[{type:Schema.types.ObjectId, ref:'car'}]

})

var Seller = mongoose.model('Seller',sellerSchema);

module.exports = Seller;