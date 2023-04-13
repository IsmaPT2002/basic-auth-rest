const { response } = require('express');
const { Marca } = require('../models');

const obtenerMarcas = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, marcas ] = await Promise.all([
        Marca.countDocuments(query),
        Marca.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        marcas
    });
}

const obtenerMarca = async(req, res = response ) => {

    const { id } = req.params;
    const marca = await Marca.findById( id )
                            .populate('usuario', 'nombre');

    res.json( marca );

}

const crearMarca = async(req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const marcaDB = await Marca.findOne({ nombre });

    if ( marcaDB ) {
        return res.status(400).json({
            msg: `La marca ${ marcaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const marca = new Marca( data );

    // Guardar DB
    await marca.save();

    res.status(201).json(marca);

}

const actualizarMarca = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const marca = await Marca.findByIdAndUpdate(id, data, { new: true });

    res.json( marca );

}

const borrarMarca = async(req, res =response ) => {

    const { id } = req.params;
    const marcaBorrada = await Marca.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( marcaBorrada );
}

module.exports = {
    crearMarca,
    obtenerMarcas,
    obtenerMarca,
    actualizarMarca,
    borrarMarca
}
