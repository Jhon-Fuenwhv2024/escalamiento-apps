const { Router } = require('express');
const Universidad = require('../models/Universidad');
const {validationResult, check } = require('express-validator');

const router = Router();

// Crear Universidad

router.post('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('direccion', 'La dirección es requerida').not().isEmpty(),
    check('telefono', 'El teléfono es requerido').not().isEmpty()
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al crear Universidad'
            });
        }

    const existeUniversidad = await Universidad.findOne({name: req.body.name});
    
    if (existeUniversidad) {
        return res.status(400).json({
            mensaje: 'La Universidad ya existe'
        });
    }

    let universidad = new Universidad();
    universidad.name = req.body.name;
    universidad.direccion = req.body.direccion;
    universidad.telefono = req.body.telefono;
    universidad.fechaCreacion = new Date;
    universidad.fechaActualizacion = new Date;

    universidad = await universidad.save();

    res.send(universidad);
    console.log(universidad);

    }catch(error){
        console.log(error);
    }
});

// Obtener Unviversidades
router.get('/', async function (req, res) {
    try {
        const universidad = await Universidad.find();
        res.send(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al obtener universidades'
        });
    }
});

// Actualizar Universidad

router.put('/:universidadId', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('direccion', 'El nombre es requerido').not().isEmpty(),
    check('telefono', 'El nombre es requerido').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al actualizar Universidad'
            });
        }

        let universidad = await Etapa.findById(req.params.universidadId);
        if (!universidad) {
            return res.status(400).json({
                mensaje: 'La etapa no existe o no se encontro'
            });
        }

        const existeEtapa = await Etapa.findOne({name: req.body.etapa, id: { $ne: universidad._id } });
        if (existeEtapa) {
            return res.status(400).json({
                mensaje: 'El universidad ya existe'
            });
        }

        universidad.name = req.body.name;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;        
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();

        res.send(universidad);
        console.log(universidad);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al actualizar la universidad, verificar'
        }); 
        }
        
});

// Eliminar etapa

router.delete('/:universidadId', async function(req, res){

    try {

        let universidad = await Universidad.findById(req.params.universidadId);
        if (!universidad) {
            return res.status(400).json({
                mensaje: 'La universidad no existe o no se encontro'
            });
        }

        universidad = await universidad.findByIdAndDelete(req.params.universidadId);

        res.send(universidad);
        console.log(euniversidad);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al eliminar la universidad, verificar'
        }); 
    
    }
});

module.exports = router;