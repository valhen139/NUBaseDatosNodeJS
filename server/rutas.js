const Router = require('express').Router();
var Login = require('./DataBase/Login')
var Events = require('./DataBase/Events')


Router.post("/login", (req, res) => {
    se = req.session
    Login.getLogin(req.body.usuario, req.body.password)
        .then(function (result) {
            if (result) {
                se.usuariolog = req.body.usuario
                res.json("Validado")
            } else {
                res.json("Error en usuario o password")
            }
        }).catch(function (error) {
            res.sendStatus(500).json(error)
        })
});

Router.get("/events/all", (req, res) => {
    se = req.session
    if(typeof se.usuariolog == 'undefined'){
        res.json("not logued")
    }else{
    Events.getEvents(se.usuariolog)
        .then(function (events) {
            res.json(events)
        }).catch(function (error) {
            res.sendStatus(500).json(error)
        })
    }
});

Router.post("/events/new", (req, res) => {
    se = req.session
        Events.postEvents(se.usuariolog, req.body.title, req.body.start, req.body.end)
            .then(function (result) {
                console.log("Router.post" + result)
                res.json(result)
            }).catch(function (error) {
                console.log("Router.post" +error)
                res.sendStatus(500).json(error)
            })
   
   
});

Router.post("/events/delete/:_id", (req, res) => {
    se = req.session
    console.log(req.params._id)
    Events.deleteEvents(req.params._id)
        .then(function (result) {
            console.log("Router.post" + result)
            res.json(result)
        }).catch(function (error) {
            console.log("Router.post" + error)
            res.sendStatus(500).json(error)
        })


});

Router.post("/events/update/:_id", (req, res) => {
    //se = req.session
    Events.updateEvents(req.params._id, req.body)
        .then(function (result) {
            console.log("Router.post update" + result)
            res.json(result)
        }).catch(function (error) {
            console.log("Router.post update" + error)
            res.sendStatus(500).json(error)
        })


});


Router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err); //Mostrar mensaje de error en cónsola
            res.json(err) //Devolver mensaje de error
        } else {
            req.session = null //Elimina la session
            res.send('logout') //Devolver logout como respuesta
            res.end()
        }
    });
});

module.exports = Router