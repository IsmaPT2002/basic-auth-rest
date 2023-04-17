const { Router } = require('express');
const { check } = require('express-validator');

const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');
const { obtenerUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/register',[
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
], obtenerUsuarios );



module.exports = router;