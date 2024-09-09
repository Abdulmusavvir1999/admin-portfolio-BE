module.exports = {
    // Get skill
    getSkill: async () => {
        const sql = "SELECT * FROM skill";
        try {
            const rows = await db.query(sql);
            return rows;
        } catch (error) {
            console.error("Error in getSkill:", error);
            throw error;
        }
    },

    // Update skill
    updateSkill: async (data) => {
        const { skillName, category, description, skill_id } = data;
        const updateSql = `UPDATE skill SET skillName = ?, category = ?, description = ? WHERE skill_id = ?`;
        try {
            const result = await db.query(updateSql, [skillName, category, description, skill_id]);
            return { status: "success", message: "Skill updated successfully" };
        } catch (error) {
            console.error("Error in updateSkill:", error);
            return { status: "error", message: "Database error", error };
        }
    },

    // Add skill
    addSkill: async (data) => {
        const { skillName, category, description } = data;
        const query = "INSERT INTO skill SET ?";
        const details = { skillName, category, description };
        try {
            if (!skillName || !category || !description) {
                return { status: "failed", message: "All fields are required" };
            }
            const result = await db.query(query, details);
            if (result.affectedRows === 0) {
                return { status: "failed", message: "Failed to add skill" };
            } else {
                return { status: "success", message: "Skill added successfully" };
            }
        } catch (error) {
            console.error("Error in addSkill:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // Check skill name
    checkSkillName: async (data) => {
        const query = 'SELECT * FROM skill WHERE skillName = ?';
        try {
            const rows = await db.query(query, [data.skillName]);
            if (rows.length > 0) {
                return { status: "failed", message: "Skill name already exists" };
            } else {
                return { status: "success" };
            }
        } catch (error) {
            console.error("Error in checkSkillName:", error);
            throw error;
        }
    },

    // Delete skill
    deleteSkill: async (data) => {
        const { skill_id } = data;
        const query = "DELETE FROM skill WHERE skill_id = ?";
        try {
            const result = await db.query(query, [skill_id]);
            if (result.affectedRows === 0) {
                return { status: "failed", message: "Skill not found" };
            } else {
                return { status: "success", message: "Skill deleted successfully" };
            }
        } catch (error) {
            console.error("Error in deleteSkill:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // getFrontend

    getFrontend: async () => {
        let sql = "select * from skill where category = 'FrontEnd'"
        try {
            let row = db.query(sql);
            return row
        } catch (error) {
            console.error("Error in getFrontend:", error);
            throw error;
        }
    },

    // getBackendSkill

    getBackend: async () => {
        let sql = "select * from skill where category = 'BackEnd';"
        try {
            let row = db.query(sql)
            return row
        } catch (error) {
            console.error("error in getBackend", error);
            throw error;

        }
    }
};
