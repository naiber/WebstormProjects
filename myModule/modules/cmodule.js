/**
 * Created by MicheleSpinello on 09/11/2016.
 */
var moment = require('moment');

var addWeek = function(sumw){
    var b = moment();
    var a = b.clone().add(sumw,'week').format('LL');
    return a;
}

exports.addWeek = addWeek;

var addDay = function(sumd){
    var b = moment();
    var a = b.clone().add(sumd,'day').format('LL');
    return a;
}

exports.addDay = addDay;

