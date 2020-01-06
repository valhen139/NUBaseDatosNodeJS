const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/agenda', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

const user = new mongoose.Schema({ user: String, password: String });
const login = mongoose.model('users', user)
module.exports = {

    insertUser: function () {
        let luser = "demo123@demo.com"
        let lpassword = "123456"
        return new Promise(function (resolve, reject) {
            login.insertMany({ user: luser, password: lpassword }).exec(function (err, luser) {
                resolve("se creo usuario")
            })



        })
    }
}