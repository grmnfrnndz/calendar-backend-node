/*
    routes Auth
    host + /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {createUser, loginUser, revalidateToken} = require("../controllers/auth");
const {validateFields} = require("../middlewares/validate-fields");
const {validateJWT} = require("../middlewares/validate-jwt");



const router = Router();

router.post(
    '/new',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password', 'password must be 6 length characters').isLength({min: 6}),
        validateFields,
    ],
    createUser);

router.post(
    '/',
    [
        check('email', 'email is required').isEmail(),
        check('password', 'password must be 6 length characters').isLength({min: 6}),
        validateFields,
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
