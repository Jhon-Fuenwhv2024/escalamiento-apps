const { Router } = require('express');
const Etapa = require('../models/Etapa');
const {validationResult, check } = require('express-validator');

const router = Router();

// Crear Etapa

router.post('/',[
    check('name', 'El nombre es requerido').isIn(['anteproyecto', 'entrega parcial 1', 'entrega parcial 2', 'entrega final'])
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al crear la Etapa'
            });
        }

    const existeEtapa = await Etapa.findOne({name: req.body.name});
    
    if (existeEtapa) {
        return res.status(400).json({
            mensaje: 'La Etapa ya existe'
        });
    }

    let etapa = new Etapa();
    etapa.name = req.body.name;
    etapa.fechaCreacion = new Date;
    etapa.fechaActualizacion = new Date;

    etapa = await etapa.save();

    res.send(etapa);
    console.log(etapa);

    }catch(error){
        console.log(error);
    }
});

// Obtener todos las etapas

router.get('/', async function (req, res) {
    try {
        const etapa = await Etapa.find();
        res.send(etapa);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al obtener las etapas'
        });
    }
});

// Actualizar la etapa

router.put('/:etapaId', [
    check('name', 'El nombre es requerido').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al actualizar la etapa'
            });
        }

        let etapa = await Etapa.findById(req.params.etapaId);
        if (!etapa) {
            return res.status(400).json({
                mensaje: 'La etapa no existe o no se encontro'
            });
        }

        const existeEtapa = await Etapa.findOne({name: req.body.etapa, id: { $ne: etapa._id } });
        if (existeEtapa) {
            return res.status(400).json({
                mensaje: 'El etapa ya existe'
            });
        }

        etapa.name = req.body.name;
        etapa.fechaActualizacion = new Date;

        etapa = await etapa.save();

        res.send(etapa);
        console.log(etapa);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al actualizar la etapa verificar'
        }); 
        }
        
});

// Eliminar etapa

router.delete('/:etapaId', async function(req, res){

    try {

        let etapa = await Etapa.findById(req.params.etapaId);
        if (!etapa) {
            return res.status(400).json({
                mensaje: 'La etapa no existe o no se encontro'
            });
        }

        etapa = await Etapa.findByIdAndDelete(req.params.etapaId);

        res.send(etapa);
        console.log(etapa);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al eliminar la etapa, verificar'
        }); 
    
    }
});

module.exports = router;
    