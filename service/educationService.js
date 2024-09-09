const educationRepository = require("../repository/educationRepository")

module.exports = {
    //get education
    getEducation: async () => {
        let response = educationRepository.getEducation()
        return response
    },

    // updateEducation
    updateEducation: async (req) => {
        let response = educationRepository.updateEducation(req)
        return response
    },

    // add education
    addEducation: async (req) => {
        try {
            // Check if the degree already exists
            let response = await educationRepository.checkEducationDegree(req);
            if (response.status === "success") {
                // If degree does not exist, add the education
                let addEducationResponse = await educationRepository.addEducation(req);
                return addEducationResponse;
            } else {
                return response; // Degree already exists, return response
            }
        } catch (error) {
            console.error("Error in addEducation:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // delete education
    deleteEducation: async (req) => {
        let response = educationRepository.deleteEducation(req)
        return response
    },

}