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

app.use('/proyecto', require('./router/proyectoRouter'));
app.use('/cliente', require('./models/Cliente'));
app.use('/tipoProyecto', require('./models/TipoProyecto'));
app.use('/etapa', require('./models/Etapa'));
app.use('/universidad', require('./models/Universidad'));

app.listen( port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
