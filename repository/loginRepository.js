const bcrypt = require("bcrypt")
const { generateToken } = require("../middleware/createToken")


module.exports = {
    // Login 
    Login: async function (req) {
        const { email, password } = req;
        let query = 'SELECT * FROM users WHERE email = ? '
        try {
            if (!email) {
                return { status: "failed", message: "Enter the Email" }
            }
            let rows = await db.query(query, [email])
            if (rows.length > 0) {
                if (await bcrypt.compareSync(password, rows[0].password)) {
                    const Token = await generateToken({
                        email: email,
                        password: password,
                    })
                    return {
                        "email": true,
                        "password": true,
                        "token": Token,
                        "user_id": rows[0].user_id,
                        "role": rows[0].role,
                        "name": rows[0].name,
                        "email": email,
                        status: 'success',
                        message: "Login Successfully"
                    }
                }
                else {
                    return { "email": true, "password": false, status: "failed", message: "Password is Invalid" }
                }
            } else {
                return { "email": false, status: "failed", message: "Enter The Valid Email" }
            }
        } catch (error) {
        }
    },

    //inert token to user table 
    InsertToken: async function (token, user_id) {
        let query = 'update users set token=? where user_id=?';
        let rows = await db.query(query, [token, user_id])
    },

    // logout
    logout: async (user_id) => {
        let id = user_id
        let sql = `UPDATE users set token = null where user_id =${id}`
        let row = await db.query(sql)
        return { status: "success", message: "logout success" }
    }
}





