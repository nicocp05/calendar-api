const { Router } = require('express');
const { check } = require('express-validator');
const { getEvent, postEvent, putEvent, deleteEvent } = require('../controllers/events.controller');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();


router.get('/', jwtValidator, getEvent);

router.post('/', [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldsValidator
], jwtValidator, postEvent);

router.put('/:id', jwtValidator, putEvent);

router.delete('/:id', jwtValidator, deleteEvent);




module.exports = router;