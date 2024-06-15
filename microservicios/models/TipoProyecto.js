const { Schema, model} = require('mongoose');


const TipoProyectoSchema = Schema({
    name: {
        type: String, required: true, enum: ['ensayo', 'artículo', 'monografía', 'trabajo final de pregrado', 'trabajo final de especialización']
    },
    fechaCreacion: {
        type: Date,
        required: true
    },

    fechaActualizacion: {
        type: Date,
        required: true
    }
})

module.exports = model('TipoProyecto', TipoProyectoSchema);