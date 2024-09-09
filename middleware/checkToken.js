const { log } = require('util');
const encryptionDecryption = require('../controller/EncryptionDecryption');

async function validateToken(req, res, next) {


    try {
        const authHeader = req.headers;



        let query = `select * from users where token=${authHeader.token} and user_id=${authHeader.token_id}`
        let rows = await db.query(query)


        if (rows.length > 0) {
            console.log('success');
            next()
        }
        else {
            console.log('failure');
            return res.status(610).send({ "status": "failure" })
        }
    }
    catch (err) {
        console.log(err);
        return res.send({ 'status': "false" })
    }
}

module.exports = { validateToken };
