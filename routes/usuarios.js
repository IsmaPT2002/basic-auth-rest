
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares');


const { existeUsuarioPorId } = require('../helpers/db-validators');

const { obtenerUsuario, obtenerUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();


router.get('/', obtenerUsuarios );

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], obtenerUsuario );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], actualizarUsuario );

router.delete('/:id',[
    validarJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], borrarUsuario );

router.patch('/', usuariosPatch );



module.exports = router;