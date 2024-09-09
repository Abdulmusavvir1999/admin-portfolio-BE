const experienceRepository = require("../repository/experienceRepository.js")

module.exports = {
    // experience
    getExperience: async () => {
        let response = experienceRepository.getExperience()
        return response
    },

    // updateExperience
    updateExperience: async (req) => {
        let response = experienceRepository.updateExperience(req)
        return response
    },

    // postEducation
    addExperience: async (req) => {
        try {
            // Check if the company name already exists
            let response = await experienceRepository.checkExperienceCompanyName(req);
            if (response.status === "success") {
                // If company does not exist, add the experience
                let addExperienceResponse = await experienceRepository.addExperience(req);
                return addExperienceResponse;
            } else {
                return response; // company already exists, return response
            }
        } catch (error) {
            console.error("Error in addExperience:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // delete experience

    deleteExperience: async (req) => {
        let response = experienceRepository.deleteExperience(req)
        return response
    },
}