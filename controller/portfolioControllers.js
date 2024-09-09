// import folder
const portfolioService = require("../service/portfolioService")
const encryptionDecryption = require("./EncryptionDecryption")

module.exports = {



    getImage: async (req, res) => {
        try {
            let response = await portfolioService.getImage(req.body);

            res.status(200).json(response);


        } catch (error) {
            res.status(500).json({ error: 'An error occurred while uploading the file.' });
        }
    },






    // about me
    aboutMe: async (req, res) => {
        let response = await portfolioService.aboutMe()
        res.status(200).json(await encryptionDecryption.encryptData(response))
    },
    aboutUpdate: async (req, res) => {
        let aboutUpdate = await encryptionDecryption.decryptData(req.body)
        let response = await portfolioService.aboutUpdate(aboutUpdate)
        res.status(200).json(await response)
    },

    heroSectionImageUpdate: async (req, res) => {
        let heroSectionImageUpdate = await encryptionDecryption.decryptData(req.body)
        let response = await portfolioService.heroSectionImageUpdate(heroSectionImageUpdate)
        res.status(200).json(await response)
    },

    aboutImageUpdate: async (req, res) => {
        let aboutImageUpdate = await encryptionDecryption.decryptData(req.body)
        let response = await portfolioService.aboutImageUpdate(aboutImageUpdate)
        res.status(200).json(await response)
    },

    resumeImageUpdate: async (req, res) => {
        let resumeImageUpdate = await encryptionDecryption.decryptData(req.body)
        let response = await portfolioService.resumeImageUpdate(resumeImageUpdate)
        res.status(200).json(await response)
    },
}

