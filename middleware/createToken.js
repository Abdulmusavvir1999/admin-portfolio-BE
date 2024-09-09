const jwt = require("jsonwebtoken");
const JWT_SECRET = 'portfolio-secret-key'

// generate token
const generateToken = (admin) => {
    const payload = {
        email: admin.email,
        password: admin.password
    }
    const token = jwt.sign(payload, JWT_SECRET)
    return token;
}

module.exports = {
    generateToken,
}