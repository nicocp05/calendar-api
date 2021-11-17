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
                msg: 'El usuario ya existe'
            });
        }

        const salt = bcrypt.genSaltSync();
        const cryptPassword = bcrypt.hashSync( password, salt );

        const userCreated = await User.create({ name, password: cryptPassword });

        const token = await generateJWT( userCreated.userId, userCreated.name );

        res.json({
            ok: true,
            msg: 'Usuario creado',
            userCreated,
            token
        });

    } catch (error) {

        res.json({
            ok: false,
            msg: 'Error al crear usuario'
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
                msg: 'El usuario no existe'
            });
        } 

        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generateJWT( user.userId, user.name );

        res.json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            name: user.name,
            id: user.userId,
            token
        });
        
    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            msg: 'Error al crear usuario'
        });

    }

}

const tokenRevalidate = async ( req, res = response ) => {

    const { userId, name } = req;

    console.log(res);

    try {

        const token = await generateJWT( userId, name );

        res.json({
            ok: true,
            msg: 'Token revalidado',
            token,
            id: userId,
            name
        });
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error al revalidar token'
        });
    }

}

module.exports = {
    newUser,
    login,
    tokenRevalidate
}