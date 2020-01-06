const mongoose = require('mongoose')
const Evento = require('./ModelEvents.js') 

mongoose.connect('mongodb://localhost/agenda', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });


module.exports = {

    getEvents: function (puser) {
        return new Promise(function (resolve, reject) {
            Evento.find({ user: puser }).exec(function (err, events) {
                if (err) reject(err)
                resolve(events)
            })
        })
    },

    postEvents: function (puser, ptitle, pstart, pend) {
        
        return new Promise(function (reject, resolve) {
            let event = new Evento({
                user: puser,
                title: ptitle,
                start: pstart,
                end: pend
            })
            event.save().then( (err, result) =>{
                
                if (err) reject(err)
                resolve("Evento Creado")
            }).catch (error =>{
               
                reject("Error")
            })
        })
    },

    deleteEvents: function (pid) {
        
        return new Promise(function (reject, resolve) {
            Evento.deleteOne({"_id":pid}).then((err, result) => {
               
                if (err) reject(err)
                resolve("Evento Eliminado")
            }).catch(error => {
                
                reject("Error")
            })
        })
    },
    updateEvents: function (pid, event) {
        
        let newdates = {
            start: event.start,
            end: event.end
        }
        
        return new Promise(function (reject, resolve) {
            Evento.updateOne({"_id": pid}, newdates).then((err, result) => {
                
                if (err) reject(err)
                resolve("Evento Actualizado")
            }).catch(error => {
                
                reject("Error")
            })
        })
    }
}