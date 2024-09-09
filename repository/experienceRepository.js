module.exports = {
    // experience
    getExperience: async () => {
        var sql = "SELECT * FROM experience"
        try {
            const row = await db.query(sql);
            return row
        }

        catch (error) {
        }

    },

    // updateExperience
    updateExperience: async (req) => {
        const { company, role, year, description, experience_id } = req;

        // SQL query for updating profile information
        const updateSql = `
     UPDATE experience SET company = ?, role = ?, year = ?, description = ? WHERE experience_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [
                company, role, year, description, experience_id
            ]);
            return { status: "success", message: "education updated successfully" };

        } catch (error) {
            console.error("Error updating education:", error);
            return { status: "error", message: "Database error", error };
        }
    },

    // addExperience

    addExperience: async (req) => {
        const { company, role, year, description } = req
        let query = "INSERT INTO experience SET ?";
        let details = {
            company: company,
            role: role,
            year: year,
            description: description,
        };

        try {
            if (!company || !role || !year || !description) {
                return { status: "failed", message: "Fill the All Fields" }
            }
            let rows = await db.query(query, details)
            if (rows.affectedRows === 0) {
                return { status: "failed" }
            } else {
                return { status: "success", message: "experience Added" }
            }

        } catch (error) {
        }
    },

    // Service Title Check
    checkExperienceCompanyName: async function (req) {
        let query = 'SELECT * FROM experience WHERE company = ? '
        try {
            let rows = await db.query(query, req.company)
            if (rows.length > 0) {
                return { status: "failed", message: "Already degree Exists" }
            } else {
                return { status: "success" }
            }
        } catch (error) {
        }
    },

    // delete experience
    deleteExperience: async (req) => {

        const { experience_id } = req
        let query = "delete from experience where experience_id=?";

        try {
            let rows = await db.query(query, experience_id)
            if (rows.affectedRows === 0) {
                return { status: "failed" }
            } else {
                return { status: "success", message: "education Delete" }
            }

        } catch (error) {
        }
    },
}