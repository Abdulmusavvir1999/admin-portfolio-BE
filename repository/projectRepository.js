module.exports = {
    // Get project
    getProject: async () => {
        const sql = "SELECT * FROM project";
        try {
            const rows = await db.query(sql);
            return rows;
        } catch (error) {
            console.error("Error in getProject:", error);
            throw error;
        }
    },

    // Update project
    updateProject: async (data) => {
        const { project_name, project_description, github_link, website_link, project_pic, project_id } = data;
        const updateSql = `UPDATE project SET project_name = ?, project_description = ?, github_link = ? , website_link = ?, project_pic = ? WHERE project_id = ?`;
        try {
            const result = await db.query(updateSql, [project_name, project_description, github_link, website_link, project_pic, project_id]);
            return { status: "success", message: "Project updated successfully" };
        } catch (error) {
            console.error("Error in updateProject:", error);
            return { status: "error", message: "Database error", error };
        }
    },

    // Add project
    addProject: async (data) => {
        const { project_name, project_description, github_link, website_link, project_pic } = data;
        const query = "INSERT INTO project SET ?";
        const details = { project_name, project_description, github_link, website_link, project_pic };
        try {
            if (!project_name || !project_description || !github_link || !website_link) {
                return { status: "failed", message: "All fields are required" };
            }
            const result = await db.query(query, details);
            if (result.affectedRows === 0) {
                return { status: "failed", message: "Failed to add project" };
            } else {
                return { status: "success", message: "Project added successfully" };
            }
        } catch (error) {
            console.error("Error in addProject:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // Check project name
    checkProjectName: async (data) => {
        const query = 'SELECT * FROM project WHERE project_name = ?';
        try {
            const rows = await db.query(query, [data.project_name]);
            if (rows.length > 0) {
                return { status: "failed", message: "Project name already exists" };
            } else {
                return { status: "success" };
            }
        } catch (error) {
            console.error("Error in checkProject_name:", error);
            throw error;
        }
    },

    // Delete project
    deleteProject: async (data) => {
        const { project_id } = data;
        const query = "DELETE FROM project WHERE project_id = ?";
        try {
            const result = await db.query(query, [project_id]);
            if (result.affectedRows === 0) {
                return { status: "failed", message: "Project not found" };
            } else {
                return { status: "success", message: "Project deleted successfully" };
            }
        } catch (error) {
            console.error("Error in deleteProject:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },
};
