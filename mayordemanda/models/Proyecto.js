const { Schema, model} = require('mongoose');


const ProyectoSchema = Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    fechaIniciacion: {
        type: String,
        required: true
    },

    fechaEntrega: {
        type: String,
        required: true
    },

    valor: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },

    fechaActualizacion: {
        type: Date,
        required: true
    },
    clienteProyect: {
        type: Schema.Types.ObjectId,
        ref: 'cliente',
        required: true
    },
    tipoProyectoProyect: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    etapaProyect: {
        type: Schema.Types.ObjectId,
        ref: 'Etapa',
        required: true
    },
    universidadProyect: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    }

})

module.exports = model('Proyecto', ProyectoSchema);