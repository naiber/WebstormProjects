const host = 'localhost';
const dbName = 'SJ-lesson3';

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${host}/${dbName}`);

var db = mongoose.connection;
db.on('error', function() {
    console.error('Connection error!')
});
db.once('open', function() {
    console.log('DB connection Ready');
});

var User = require('./../Lesson4/models/user');

User.find().remove(function(err) {
  if(err) return console.error('Error deleting all documents!');

  (function() {
    'use strict';
    var names = ['Angelo', 'Marco', 'Daniele', 'Luca', 'Mario', 'Giuseppe', 'Antonio', 'Giovanni', 'Roberto',
    'Maria', 'Giorgia', 'Anna', 'Cristina', 'Amanda', 'Michela', 'Marianna', 'Paola'];
    var ages = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    var surnames = ['Bianchi', 'Rossi', 'Russo', 'Greco', 'Marino', 'Vitale', 'Conti', 'Mancini', 'Romeo'];
    var domains = ['google.com', 'yahoo.com', 'hotmail.it', 'virgilio.it', 'email.it', 'live.com', 'pec.it'];
    var users = [];
    for(let i = 0; i < 3000; i++) {
      let name = names[i % names.length];
      let surname = surnames[i % surnames.length];
      let age = ages[i % ages.length];
      let emails = [];
      if(((i % 7) === 0 || (i % 11) === 5) && surname[surname.lenth - 1] !== 'i') {
          emails = [name.toLowerCase() + '.' + surname.toLowerCase() + '@' + domains[i % domains.length],
                        name.toLowerCase() + '.' + surname.toLowerCase() + '@' + domains[(i+1) % domains.length]];
      } else {
          emails = name.toLowerCase() + '.' + surname.toLowerCase() + '@' + domains[i % domains.length];
      }

      let newUserData =  {name: name, surname: surname, age: age, email: emails};

      if (users.indexOf(newUserData) === -1) {
          users.push(newUserData);
          let newUser = new User(newUserData);
          newUser.save(users, function(err, savedUser) {
              if(err) return console.error('Error saving user: ', err);
              console.log("User Saved!");
          });
      }
    }
    console.log(users.length);
  })();
})
