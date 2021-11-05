const { request, response } = require('express');
const { User } = require('../models/User.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const newUser = async (req = request, res = response) => {

    const { name, password } = req.body;

    try {

        const user = await User.findOne({
            where: {
                name
            }
        });

        if( user ) {
            return res.json({
                ok: false,
                msg: 'The user already exists'
            });
        }

        const salt = bcrypt.genSaltSync();
        const cryptPassword = bcrypt.hashSync( password, salt );

        const userCreated = await User.create({ name, password: cryptPassword });

        const token = await generateJWT( userCreated.userId, userCreated.name );

        res.json({
            ok: true,
            msg: 'User created',
            userCreated,
            token
        });

    } catch (error) {

        res.json({
            ok: false,
            msg: 'Error when creating user'
        });

    }
    
}

const login = async (req = request, res = response) => {

    const { name, password } = req.body;

    try {

        const user = await User.findOne({
            where: {
                name
            }
        });

        if( !user ) {
            return res.json({
                ok: false,
                msg: 'User does not exist'
            });
        } 

        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) {
            return res.json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT( user.userId, user.name );

        res.json({
            ok: true,
            msg: 'todo bien',
            name: user.name,
            token
        });
        
    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            msg: 'Error when creating user'
        });

    }

}

module.exports = {
    newUser,
    login
}