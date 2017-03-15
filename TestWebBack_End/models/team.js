/**
 * Created by MicheleSpinello on 21/12/2016.
 */
var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    name:String,
    motto:String,
    numPlayers:{type: Number , min:25 , max:40},
    created:{type:Date},
    players:[{type: mongoose.Schema.Types.ObjectId, ref:'Player'}]
});

var Team = mongoose.model('Team',teamSchema);

module.exports = Team;