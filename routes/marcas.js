const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { crearMarca,
obtenerMarcas,
obtenerMarca,
actualizarMarca,
borrarMarca } = require('../controllers/marcas');
const { existeMarcaPorId } = require('../helpers/db-validators');

const router = Router();

/**

{{url}}/api/marcas
*/
// Obtener todas las marcas - público
router.get('/', obtenerMarcas );

// Obtener una marca por id - público
router.get('/:id',[
check('id', 'No es un id de Mongo válido').isMongoId(),
check('id').custom( existeMarcaPorId ),
validarCampos,
], obtenerMarca );

// Crear marca - privado - cualquier persona con un token válido
router.post('/', [
validarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos
], crearMarca );

// Actualizar marca - privado - cualquiera con token válido
router.put('/:id',[
validarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('id').custom( existeMarcaPorId ),
validarCampos
],actualizarMarca );

// Borrar una marca - Admin
router.delete('/:id',[
validarJWT,
check('id', 'No es un id de Mongo válido').isMongoId(),
check('id').custom( existeMarcaPorId ),
validarCampos,
],borrarMarca);

module.exports = router;