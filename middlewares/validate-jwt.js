const {Request, Response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (request = Request, response = Response, next) => {

    // x-token
    const token = request.header('x-token');

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'token is required'
        });
    }

    try {

        const {uid, name} = jwt.verify(
            token, process.env.SECRET_JWT_SEED
        );

        request.uid = uid;
        request.name = name;


    } catch(err) {
        return response.status(401).json({
            ok: false,
            msg: 'token not valid'
        })
    }

    next();
}

module.exports = {
    validateJWT
}
