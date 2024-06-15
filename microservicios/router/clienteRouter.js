const { Router } = require('express');
const Cliente = require('../models/Cliente');
const {validationResult, check } = require('express-validator');

const router = Router();

// Crear Cliente

router.post('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al crear el cliente'
            });
        }

    const existeCliente = await Cliente.findOne({name: req.body.name});
    
    if (existeCliente) {
        return res.status(400).json({
            mensaje: 'El cliente ya existe'
        });
    }

    let cliente = new Cliente();
    cliente.name = req.body.name;
    cliente.email = req.body.email;
    cliente.fechaCreacion = new Date;
    cliente.fechaActualizacion = new Date;

    cliente = await cliente.save();

    res.send(cliente);
    console.log(cliente);

    }catch(error){
        console.log(error);
    }
});

// Obtener todos los clientes o listar los clientes

router.get('/', async function (req, res) {
    try {
        const cliente = await Cliente.find();
        res.send(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al listar los clientes'
        });
    }
});

// Actualizar el cliente

router.put('/:clienteId', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Error al actualizar el cliente'
            });
        }

        let cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(400).json({
                mensaje: 'El cliente no existe o no se encontro'
            });
        }

        const existeCliente = await Cliente.findOne({name: req.body.cliente, id: { $ne: cliente._id } });
        if (existeCliente) {
            return res.status(400).json({
                mensaje: 'El cliente ya existe'
            });
        }

        cliente.name = req.body.name;
        cliente.email = req.body.email;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();

        res.send(cliente);
        console.log(cliente);

    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el cliente verificar'
        }); 
        }
        
});

// Eliminar el cliente

router.delete('/:clienteId', async function(req, res){

    try {

        let cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(400).json({
                mensaje: 'El cliente no existe o no se encontro'
            });
        }
        
        cliente = await Cliente.findByIdAndDelete(req.params.clienteId);
        
        res.send(cliente);
        console.log({
            mensaje: 'Cliente eliminado'
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el cliente, verificar'
        });
    }
});

module.exports = router;
    