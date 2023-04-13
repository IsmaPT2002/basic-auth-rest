
const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    
});


MarcaSchema.methods.toJSON = function() {
    const { __v, _id, ...marca  } = this.toObject();
    marca.uid = _id;
    return marca;
}

module.exports = model( 'Marca', MarcaSchema );
