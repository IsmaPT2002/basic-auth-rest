const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const obtenerUsuarios = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const obtenerUsuario = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById( id )
                                .populate('usuario', 'nombre');

    
    res.json(usuario);
}



const crearUsuario = async(req, res = response) => {
    
    const { correo, password } = req.body;
    const usuario = new Usuario({ correo, password });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const actualizarUsuario = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}


const borrarUsuario = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete( id );

    
    res.json(usuario);
}




module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}