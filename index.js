require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Rutas
app.get('/', function (req, res) {
    //res.send('hello world');
    //res.json({'ok':'true', 'msg':'Hola mundo'});
    res.status(400).json({ 'ok': 'true', 'msg': 'Hola mundo' })
});


app.listen(process.env.PORT, () => {
    console.log("Servidor corriendoe en el puerto \x1b[33m%s\x1b[0m", process.env.PORT);
})