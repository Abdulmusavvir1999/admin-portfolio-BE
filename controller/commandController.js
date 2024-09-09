const { log } = require("util")
const commandService = require("../service/commandService")
const encryptionDecryption = require("./EncryptionDecryption")

module.exports = {
    // get command
    getCommand: async (req, res) => {
        let response = await commandService.getCommand()
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },

    // addCommand
    addCommand: async (req, res) => {

        let addCommand = await encryptionDecryption.decryptData(req.body)
        let response = await commandService.addCommand(addCommand)

        if (response.status === "success") {
            res.status(200).json(await encryptionDecryption.encryptData(response))
        } else {
            res.status(604).json(await encryptionDecryption.encryptData(response))
        }
    },

    // addCommand
    deleteCommand: async (req, res) => {
        let addCommand = await encryptionDecryption.decryptData(req.body)
        let response = await commandService.deleteCommand(addCommand)
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },
}