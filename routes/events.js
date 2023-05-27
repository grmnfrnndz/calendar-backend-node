/*
    routes Auth
    host + /api/events
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {validateJWT} = require("../middlewares/validate-jwt");
const {getEvents, createEvent, deleteEvent, updateEvent} = require("../controllers/events");
const {validateFields} = require("../middlewares/validate-fields");
const {isDate} = require("../helpers/isDate");


const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post('/', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'date start is required').custom(isDate),
    check('end', 'date start is required').custom(isDate),
    validateFields
], createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;