const http = require('http'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser')
      session = require('express-session')
      
const PORT = 8082
const app = express()

const Server = http.createServer(app)




app.use(express.static('client'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({ //Inicia sesiones
    secret: 'secret',
    cookie: { maxAge: 7200000 }, //sesión iniciada por 2 hora
    resave: false,
    saveUninitialized: true,
}));

app.use('/API', Routing)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})

