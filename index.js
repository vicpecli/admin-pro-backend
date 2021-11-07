require('dotenv').config();// npm i dotenv


const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');


//crear el servidor de Express
const app = express();

//Configurar CORS
app.use( cors() );

//Lectura y Parseo del Body
app.use( express.json() );


//Base de Datos
dbConnection();



//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, ()=>{
    console.log('Servicor Corriendo en el puerto ' + process.env.PORT)
});

