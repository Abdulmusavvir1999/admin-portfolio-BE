const userRepository = require("../repository/userRepository");

module.exports = {
    // Get user
    getUser: async () => {
        try {
            return await userRepository.getUser();
        } catch (error) {
            console.error("Error in getUser:", error);
            throw error;
        }
    },

    // getAdminDetails
    getAdminDetails: async (id) => {
        try {
            return await userRepository.getAdminDetails(id);
        } catch (error) {
            console.error("Error in getUser:", error);
            throw error;
        }
    },

    // Update user
    updateUser: async (data) => {
        try {
            return await userRepository.updateUser(data);
        } catch (error) {
            console.error("Error in updateUser:", error);
            throw error;
        }
    },

    // Update user password
    updateUserPassword: async (data) => {
        try {
            return await userRepository.updateUserPassword(data);
        } catch (error) {
            console.error("Error in updateUserPassword:", error);
            throw error;
        }
    },

    // Add user
    addUser: async (data) => {
        try {
            const checkResponse = await userRepository.checkUserName(data);
            if (checkResponse.status === "success") {
                return await userRepository.addUser(data);
            } else {
                return checkResponse; // User already exists
            }
        } catch (error) {
            console.error("Error in addUser:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // Delete user
    deleteUser: async (data) => {
        try {
            return await userRepository.deleteUser(data);
        } catch (error) {
            console.error("Error in deleteUser:", error);
            throw error;
        }
    },
};
