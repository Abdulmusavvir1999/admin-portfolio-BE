const projectRepository = require("../repository/projectRepository");

module.exports = {
    // Get project
    getProject: async () => {
        try {
            return await projectRepository.getProject();
        } catch (error) {
            console.error("Error in getProject:", error);
            throw error;
        }
    },

    // Update project
    updateProject: async (data) => {
        try {
            return await projectRepository.updateProject(data);
        } catch (error) {
            console.error("Error in updateProject:", error);
            throw error;
        }
    },

    // Add project
    addProject: async (data) => {
        try {
            const checkResponse = await projectRepository.checkProjectName(data);
            if (checkResponse.status === "success") {
                return await projectRepository.addProject(data);
            } else {
                return checkResponse; // Project already exists
            }
        } catch (error) {
            console.error("Error in addProject:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // Delete project
    deleteProject: async (data) => {
        try {
            return await projectRepository.deleteProject(data);
        } catch (error) {
            console.error("Error in deleteProject:", error);
            throw error;
        }
    },
};
