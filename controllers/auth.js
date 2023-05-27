const {Response, Request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJWT} = require("../helpers/jwt");

const createUser = async (request = Request, response = Response) => {
    const {email, password} = request.body;

    // error driver (move to middlewares)
    // const errors = validationResult(request);
    // if (!errors.isEmpty()) {
    //     return response.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     })
    // }

    // simple validation
    // if (name.length < 5) {
    //     return response.status(400).json({
    //         ok: false,
    //         msg: `length must be at least ${name.length}`
    //     })
    // }

    try {

        let user = await User.findOne({email});

        if (user) {
            return response.status(400).json({
                ok: false,
                msg: `one user exists with email: ${email}`
            })
        }

        user = new User(request.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // generate JWT
        const token = await generateJWT(user.id, user.name);

        response.status(201).json({
            'ok': true,
            'msg': 'create user',
            token
        });
    } catch (err) {
        console.log(err);
        response.status(500).json({
            ok: false,
            msg: 'Contact to administrator!!!'
        })
    }

}

const loginUser = async (request = Request, response = Response) => {
    const {email, password} = request.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return response.status(400).json({
                ok: false,
                msg: `user and email incorrect: ${email}`
            });
        }

        // confirm password
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: `user and email incorrect: ${email}`
            });
        }

        // generate JWT
        const token = await generateJWT(user.id, user.name);

        response.status(200).json({
            'ok': true,
            'msg': 'login user',
            token
        });
    } catch (err) {
        console.log(err);
        response.status(500).json({
            ok: false,
            msg: 'Contact to administrator!!!'
        });
    }
}


const revalidateToken = async (request = Request, response = Response) => {
    const {uid, name} = request;
    const token = await generateJWT(uid, name);

    response.json({
        ok: true,
        msg: 'renew',
        token,
    });

}


module.exports = {
    createUser,
    loginUser,
    revalidateToken,
}

