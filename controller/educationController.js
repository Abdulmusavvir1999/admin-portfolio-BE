const { log } = require("util")
const educationService = require("../service/educationService")
const encryptionDecryption = require("./EncryptionDecryption")

module.exports = {
    // get education
    getEducation: async (req, res) => {
        let response = await educationService.getEducation()
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },

    // updateEducation
    updateEducation: async (req, res) => {
        let updateEducation = await encryptionDecryption.decryptData(req.body)
        let response = await educationService.updateEducation(updateEducation)
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },

    // addEducation
    addEducation: async (req, res) => {

        let addEducation = await encryptionDecryption.decryptData(req.body)
        let response = await educationService.addEducation(addEducation)

        if (response.status === "success") {
            res.status(200).json(await encryptionDecryption.encryptData(response))
        } else {
            res.status(604).json(await encryptionDecryption.encryptData(response))
        }
    },

    // addEducation
    deleteEducation: async (req, res) => {
        let addEducation = await encryptionDecryption.decryptData(req.body)
        let response = await educationService.deleteEducation(addEducation)
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },
}