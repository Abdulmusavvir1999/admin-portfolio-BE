const loginService = require('../service/loginService');
const encryptionDecryption = require("./EncryptionDecryption")


module.exports = {

    login: async (req, res) => {
        let encrypt = await encryptionDecryption.decryptData(req.body)
        let response = await loginService.login(encrypt)
        if (response.status === "success") {
            res.status(200).json(await encryptionDecryption.encryptData(response))

        } else {
            res.status(604).json(await encryptionDecryption.encryptData(response))

        }

    },

    // logOut

    logout: async (req, res) => {
        let decrypt = await encryptionDecryption.decryptData(req.body)
        let response = await loginService.logout(decrypt)
        if (response.status === "success") {
            res.status(200).json(await response)
        } else {
            res.status(604).json(await response)
        }
    }


}
