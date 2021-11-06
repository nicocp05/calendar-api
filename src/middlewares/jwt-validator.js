const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        
        res.json({
            ok: false,
            msg: 'User is not authenticated'
        });

    }

    try {

        const { userId, name } = jwt.verify( token, process.env.SECRET_KEY );

        req.userId = userId;
        req.name = name;
        
    } catch (error) {
        
        return res.json({
            ok: false,
            msg: 'Token is not valid'
        });

    }

    next();

}

module.exports = {
    jwtValidator
}