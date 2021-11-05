const jwt = require('jsonwebtoken');

const generateJWT = ( userId, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { userId, name }

        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('The token could not be generated')
            }

            resolve(token);

        });

    });

}




module.exports = {
    generateJWT
}