// imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// inicializamos la conexion con firebase
// necesitamos json con las credenciales 
var admin = require('firebase-admin');
var serviceAccount = require('./dbfirebase.json');
admin.initializeApp({

    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://aplicationfirebase-314e6.firebaseio.com'

});

var db = admin.database();
var ref = db.ref("/dispositivos");
var resultado = null;
ref.on("value", function(snapshot) {
    console.log("dentro de la funcion:" + snapshot.val().nombre.hora.date+snapshot.val().nombrea.hora.daycurl);
    resultado = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/html'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/enviar', (req, res) => {
    let token = req.body.token;
    let msg = req.body.msg;
    let pagina = '<!doctype html><html><head></head><body>';
    pagina += `<p>(${token}/${msg}) Enviado </p>`;
    pagina += '</body></html>';
    res.send(pagina);
});

app.get('/mostrar', (req, res) => {
    let pagina = '<!doctype html><html><head></head><body>';
    pagina += 'Muestro<br>';
    pagina += '<div id="resultado">' + resultado + '</div>'
    pagina += '<p>...</p>';
    pagina += '</body></html>';
    res.send(pagina);
});



var server = app.listen(8080, () => {
    console.log('Servidor web iniciado');
});