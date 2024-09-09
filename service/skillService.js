const skillRepository = require("../repository/skillRepository");

module.exports = {
    // Get skill
    getSkill: async () => {
        try {
            return await skillRepository.getSkill();
        } catch (error) {
            console.error("Error in getSkill:", error);
            throw error;
        }
    },

    // Update skill
    updateSkill: async (data) => {
        try {
            return await skillRepository.updateSkill(data);
        } catch (error) {
            console.error("Error in updateSkill:", error);
            throw error;
        }
    },

    // Add skill
    addSkill: async (data) => {
        try {
            const checkResponse = await skillRepository.checkSkillName(data);
            if (checkResponse.status === "success") {
                return await skillRepository.addSkill(data);
            } else {
                return checkResponse; // Skill already exists
            }
        } catch (error) {
            console.error("Error in addSkill:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // Delete skill
    deleteSkill: async (data) => {
        try {
            return await skillRepository.deleteSkill(data);
        } catch (error) {
            console.error("Error in deleteSkill:", error);
            throw error;
        }
    },

    // getFrontend

    getFrontend: async () => {
        try {
            let response = await skillRepository.getFrontend()
            return response

        } catch (error) {
            console.error("Error in getFrontend:", error);
            throw error;
        }
    },

    // getBackendSkill

    getBackend: async () => {
        try {
            let response = await skillRepository.getBackend()
            return response;

        } catch (error) {
            console.error("error in getBackend", error);
            throw error;
        }
    }
};
