// import folder
const portfolioRepository = require("../repository/portfolioRepositorys")

// module exports

module.exports = {

    getImage: async (file) => {
        let response = portfolioRepository.getImage(file)
        return response
    },




    aboutMe: async () => {
        let response = portfolioRepository.aboutMe()
        return response
    },
    aboutUpdate: async (req) => {
        let response = portfolioRepository.aboutUpdate(req)
        return response
    },

    heroSectionImageUpdate: async (req) => {
        let response = portfolioRepository.heroSectionImageUpdate(req)
        return response
    },

    aboutImageUpdate: async (req) => {
        let response = portfolioRepository.aboutImageUpdate(req)
        return response
    },

    resumeImageUpdate: async (req) => {
        let response = portfolioRepository.resumeImageUpdate(req)
        return response
    },



}
