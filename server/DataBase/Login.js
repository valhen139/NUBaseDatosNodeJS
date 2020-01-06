const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/agenda', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

const user = new mongoose.Schema({ user: String, password: String});
const login = mongoose.model('users', user)
module.exports = {

    getLogin: function(puser,ppassword){
        return new Promise(function (resolve, reject) {
            login.findOne({ user: puser }).exec(function (err, luser) {
                if (luser === null) {
                    resolve(false)
                } else {
                    resolve(luser.password == ppassword)
                }
            })



        })  
    }
}