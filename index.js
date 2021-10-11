require('dotenv').config();// npm i dotenv

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config')


//crear el servidor de Express
const app = express();

//Configurar CORS
 app.use( cors() );

//Base de Datos
dbConnection();



//Rutas
app.get( '/' , (request, response)=>{

    response.status(200).json({
        ok: true,
        msg:'Hola Mundo'
    })
});



app.listen(process.env.PORT, ()=>{
    console.log('Servicor Corriendo en el puerto ' + process.env.PORT)
});

