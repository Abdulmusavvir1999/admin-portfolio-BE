const loginRepository = require('../repository/loginRepository');


module.exports = {
    login: async function (req) {
        var response = await loginRepository.Login(req)
        var insertToken = await loginRepository.InsertToken(response.token, response.user_id)
        return response
    },

    // logout
    logout: async function (user_id) {
        var response = await loginRepository.logout(user_id)
        return response
    },

}

