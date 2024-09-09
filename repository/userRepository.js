const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    // Get user
    getUser: async () => {
        const sql = "SELECT * FROM users";
        try {
            const rows = await db.query(sql);
            return rows;
        } catch (error) {
            console.error("Error in getUser:", error);
            throw error;
        }
    },

    // getAdminDetails
    getAdminDetails: async (id) => {
        const { user_id } = id;


        const sql = 'SELECT * FROM users WHERE user_id = ?';

        try {
            const rows = await db.query(sql, [user_id]);
            return rows;
        } catch (error) {
            console.error("Error in getAdminDetails:", error);
            throw new Error('Failed to retrieve admin details');
        }
    },


    // Update user
    updateUser: async (data) => {
        const { email, role, about, education_experience, skills, project, users, command, user_id } = data;
        const updateSql = `UPDATE users SET email = ?, role = ?, about = ?, education_experience = ?, skills = ?, project = ?, users = ?, command = ? WHERE user_id = ?`;
        try {
            const result = await db.query(updateSql, [email, role, about, education_experience, skills, project, users, command, user_id]);
            return { status: "success", message: "User updated successfully" };
        } catch (error) {
            console.error("Error in updateUser:", error);
            return { status: "error", message: "Database error", error };
        }
    },

    // user password
    updateUserPassword: async (data) => {
        const { password, user_id } = data;

        try {
            // Hash the new password
            const bcryptPassword = await bcrypt.hash(password, saltRounds);

            // SQL query to update the password
            const updateSql = `UPDATE users SET password = ? WHERE user_id = ?`;

            // Execute the query
            const result = await db.query(updateSql, [bcryptPassword, user_id]);

            // Check if any rows were affected
            if (result.affectedRows === 0) {
                return { status: "failed", message: "No user found or password not updated" };
            } else {
                return { status: "success", message: "User password updated successfully" };
            }
        } catch (error) {
            console.error("Error updating user password:", error);
            return { status: "error", message: "Database error", error };
        }
    },

    addUser: async (data) => {
        const { email, password, role, about, education_experience, skills, project, users, command } = data;

        // Check if all required fields are provided
        if (!email || !password) {
            return { status: "failed", message: "All fields are required" };
        }

        try {
            // Hash the password
            const bcryptPassword = await bcrypt.hash(password, saltRounds);

            // Prepare the query and details
            const query = "INSERT INTO users SET ?";
            const details = { email, password: bcryptPassword, role, about, education_experience, skills, project, users, command };

            // Execute the query
            const result = await db.query(query, details);

            // Check if the user was added successfully
            if (result.affectedRows === 0) {
                return { status: "failed", message: "Failed to add user" };
            } else {
                return { status: "success", message: "User added successfully" };
            }
        } catch (error) {
            console.error("Error in addUser:", error);
            return { status: "failed", message: "An error occurred", error };
        }
    },


    // Check email
    checkUserName: async (data) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        try {
            const rows = await db.query(query, [data.email]);
            if (rows.length > 0) {
                return { status: "failed", message: "Email already exists" };
            } else {
                return { status: "success" };
            }
        } catch (error) {
            console.error("Error in checkEmail:", error);
            throw error;
        }
    },

    // Delete user
    deleteUser: async (data) => {
        const { user_id } = data;
        const query = "DELETE FROM users WHERE user_id = ?";
        try {
            const result = await db.query(query, [user_id]);
            if (result.affectedRows === 0) {
                return { status: "failed", message: "User not found" };
            } else {
                return { status: "success", message: "User deleted successfully" };
            }
        } catch (error) {
            console.error("Error in deleteUser:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },
};
