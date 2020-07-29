require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');
const { use } = require('./routes/auth');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json())

// Directorio publico
app.use( express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/busquedas', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

app.get('*', (req, res) => {
res.sendFile( path.resolve(__dirname, 'public/index.html'));
})

// Ruta ejercicio ejemplo
// app.get('/', function (req, res) {
//     //res.send('hello world');
//     //res.json({'ok':'true', 'msg':'Hola mundo'});
//     res.status(400).json({ 'ok': 'true', 'msg': 'Hola mundo' })
// });

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendoe en el puerto \x1b[33m%s\x1b[0m", process.env.PORT);
})
