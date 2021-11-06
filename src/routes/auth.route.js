const { Router } = require('express');
const { newUser, login, tokenRevalidate } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The characters must be between 6 and 12').isLength({min: 6, max: 12}),
    fieldsValidator
], newUser);

router.post('/login', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The characters must be between 6 and 12').isLength({min: 6, max: 12}),
    fieldsValidator
], login);

router.get('/renew', jwtValidator, tokenRevalidate);

module.exports = router;