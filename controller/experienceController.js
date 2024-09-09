// import folder
const experienceService = require("../service/experienceService")
const encryptionDecryption = require("./EncryptionDecryption")



module.exports = {
    // get experience
    getExperience: async (req, res) => {
        let response = await experienceService.getExperience()
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },

    // updateExperience
    updateExperience: async (req, res) => {
        let updateExperience = await encryptionDecryption.decryptData(req.body)
        let response = await experienceService.updateExperience(updateExperience)
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },

    // add
    addExperience: async (req, res) => {

        let addExperience = await encryptionDecryption.decryptData(req.body)
        let response = await experienceService.addExperience(addExperience)

        if (response.status === "success") {
            res.status(200).json(await encryptionDecryption.encryptData(response))
        } else {
            res.status(604).json(await encryptionDecryption.encryptData(response))
        }
    },

    // post
    deleteExperience: async (req, res) => {
        let deleteExperience = await encryptionDecryption.decryptData(req.body)
        let response = await experienceService.deleteExperience(deleteExperience)
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },



}