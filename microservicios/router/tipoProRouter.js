const { Router } = require('express');
const TipoProyecto = require('../models/TipoProyecto');
const {validationResult, check } = require('express-validator');

const router = Router();

// Crear TipoProyecto

router.post('/',[
    check('name', 'El nombre es requerido').isIn(['ensayo', 'artículo', 'monografía', 'trabajo final de pregrado', 'trabajo final de especialización'])
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al crear eL tipo de proyecto'
            });
        }

    const existeTipoProyecto = await TipoProyecto.findOne({name: req.body.name});
    
    if (existeTipoProyecto) {
        return res.status(400).json({
            mensaje: 'El tipo de proyecto ya existe'
        });
    }

    let tipoProyecto = new TipoProyecto();
    tipoProyecto.name = req.body.name;
    tipoProyecto.fechaCreacion = new Date;
    tipoProyecto.fechaActualizacion = new Date;

    tipoProyecto = await tipoProyecto.save();

    res.send(tipoProyecto);
    console.log(tipoProyecto);

    }catch(error){
        console.log(error);
    }
});

// Obtener todos los tipos proyectos

router.get('/', async function (req, res) {
    try {
        const tipoProyecto = await TipoProyecto.find();
        res.send(tipoProyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al obtener los tipos de proyectos'
        });
    }
});

// Actualizar Proyecto

router.put('/:TipoProyectoId', [
    check('name', 'El nombre es requerido').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al actualizar el tipo proyecto'
            });
        }

        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId);
        if (!tipoProyecto) {
            return res.status(400).json({
                mensaje: 'El tipo de Proyecto no existe o no se encontro'
            });
        }

        const existeTipoProyecto = await TipoProyecto.findOne({name: req.body.tipoProyecto, id: { $ne: tipoProyecto._id } });
        if (existeTipoProyecto) {
            return res.status(400).json({
                mensaje: 'El tipo de Proyecto ya existe'
            });
        }

        tipoProyecto.name = req.body.name;
        tipoProyecto.fechaActualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();

        res.send(tipoProyecto);
        console.log(tipoProyecto);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el tipo proyecto, verificar'
        }); 
        }
        
});

// Eliminar proyecto

router.delete('/:tipoProyectoId', async function(req, res){

    try {

        let tipoProyecto = await Etapa.findById(req.params.tipoProyectoId);
        if (!tipoProyecto) {
            return res.status(400).json({
                mensaje: 'El tipo Proyecto no existe o no se encontro'
            });
        }

        tipoProyecto = await tipoProyecto.findByIdAndDelete(req.params.tipoProyectoId);

        res.send(tipoProyecto);
        console.log(tipoProyecto);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el tipo Proyecto, verificar'
        }); 
    
    }
});

module.exports = router;