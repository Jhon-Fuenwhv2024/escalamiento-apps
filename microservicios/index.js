const express = require('express');
const {getConnection} = require('./db/connect-db-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// implementacion de cors
app.use(cors());

getConnection();

// Parseo de los datos a formato JSON
app.use(express.json());
app.use('/cliente', require('./router/clienteRouter'));
app.use('/etapa', require('./router/etapaRouter'));
app.use('/tipoProyecto', require('./router/tipoProRouter'));
app.use('/universidad', require('./router/universidadRouter'));

app.listen( port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
