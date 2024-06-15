const { Router, request } = require('express');
const Proyecto = require('../models/Proyecto');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear Proyecto

router.post('/', [
    check('number', 'El  numero es requerido').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    check('fechaIniciacion', 'La fecha es requeridad').not().isEmpty(),
    check('fechaEntrega', 'La fecha es requeridad').not().isEmpty(),
    check('valor', 'El valor es requerido').not().isEmpty(),

    check('clienteProyect', 'El cliente es requerido').not().isEmpty(),
    check('tipoProyectoProyect', 'El tipo de proyecto es requerido').not().isEmpty(),
    check('etapaProyect', 'La etapa es requerida').not().isEmpty(),
    check('universidadProyect', 'la universidad es requerida').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al crear el Proyecto'
            });
        }

        const existeProyectoNumber = await Proyecto.findOne({ number: req.body.number });

        if (existeProyectoNumber) {
            return res.status(400).json({
                mensaje: 'El proyecto ya existe con ese numero'
            });
        }

        let proyecto = new Proyecto();
        proyecto.number = req.body.number;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.fechaCreacion = new Date;
        proyecto.fechaActualizacion = new Date;
        proyecto.clienteProyect = req.body.clienteProyect._id;
        proyecto.tipoProyectoProyect = req.body.tipoProyectoProyect._id;
        proyecto.etapaProyect = req.body.etapaProyect._id;
        proyecto.universidadProyect = req.body.universidadProyect._id;

        proyecto = await proyecto.save();

        res.send(proyecto);
        console.log(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al crear el Proyecto, verificar'
        });
    }
});

// Obtener todos los Proyectos

router.get('/', async (req, res) => {

    try {

        const proyectos = await Proyecto.find().populate([
            {
                path: 'clienteProyect',
                model: 'Cliente',
                select: 'name email'
            },
            {
                path: 'tipoProyectoProyect',
                model: 'TipoProyecto',
                select: 'name'
            },
            {
                path: 'etapaProyect',
                model: 'Etapa',
                select: 'name'
            },
            {
                path: 'universidadProyect',
                model: 'Universidad',
                select: 'name direccion telefono',
            }

        ]);
        res.send(proyectos);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al listar los Proyectos, verificar'
        });
    }
});

// Actualizar Proyecto

router.put('/:proyectoId', [
    check('number', 'El  es requerido').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    check('fechaIniciacion', 'La fecha es requeridad').not().isEmpty(),
    check('fechaEntrega', 'La fecha es requeridad').not().isEmpty(),
    check('valor', 'El valor es requerido').not().isEmpty(),

    check('clienteProyect', 'El cliente es requerido').not().isEmpty(),
    check('tipoProyectoProyect', 'El tipo de proyecto es requerido').not().isEmpty(),
    check('etapaProyect', 'La etapa es requerida').not().isEmpty(),
    check('universidadProyect', 'la universidad es requerida').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al actualizar proyecto'
            });
        }

        let proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(400).json({
                mensaje: 'El proyecto no existe o no se encontro'
            });
        }

        const exiteProyectoPorTitulo = await Proyecto.findOne({ titulo: req.body.titulo, _id: { $ne: proyecto._id } });

            if (exiteProyectoPorTitulo) {
                return res.status(400).json({
                    mensaje: 'Ya existe un proyecto con ese titulo'
                });
            }

        proyecto.number = req.body.number;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.fechaCreacion = new Date;
        proyecto.fechaActualizacion = new Date;
        proyecto.clienteProyect = req.body.clienteProyect._id;
        proyecto.tipoProyectoProyect = req.body.tipoProyectoProyect._id;
        proyecto.etapaProyect = req.body.etapaProyect._id;
        proyecto.universidadProyect = req.body.universidadProyect._id;

        proyecto = await proyecto.save();

        res.send(proyecto);
        console.log(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el proyecto, verificar'
        });
    }

});

// Eliminar Proyecto

router.delete('/:proyectoId', async function (req, res) {

    try {

        let proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(400).json({
                mensaje: 'La etapa no existe o no se encontro'
            });
        }

        proyecto = await Proyecto.findByIdAndDelete(req.params.proyectoId);

        res.send(proyecto);
        console.log(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el Proyecto, verificar'
        });

    }
});

// Obtener Proyecto por Id

router.get('/:proyectoId', async function (req, res) {

    try {

        const proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(400).json({
                mensaje: 'El proyecto no existe o no se encontro'
            });
        }
        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al obtener el Proyecto, verificar'
        });
    }

});

module.exports = router;