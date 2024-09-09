module.exports = {
    // get education
    getEducation: async () => {
        var sql = "SELECT * FROM education"
        try {
            const row = await db.query(sql);
            return row
        }

        catch (error) {
        }

    },

    // updateEducation
    updateEducation: async (req) => {
        const { degree, university, year, description, education_id } = req;

        // SQL query for updating profile information
        const updateSql = `
     UPDATE education SET degree = ?, university = ?, year = ?, description = ? WHERE education_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [
                degree, university, year, description, education_id
            ]);
            return { status: "success", message: "education updated successfully" };

        } catch (error) {
            console.error("Error updating education:", error);
            return { status: "error", message: "Database error", error };
        }
    },

    // addEducation

    addEducation: async (req) => {
        const { degree, university, year, description } = req
        let query = "INSERT INTO education SET ?";
        let details = {
            degree: degree,
            university: university,
            year: year,
            description: description,
        };

        try {
            if (!degree || !university || !year || !description) {
                return { status: "failed", message: "Fill the All Fields" }
            }
            let rows = await db.query(query, details)
            if (rows.affectedRows === 0) {
                return { status: "failed" }
            } else {
                return { status: "success", message: "Service Added" }
            }

        } catch (error) {
        }
    },

    // Service Title Check
    checkEducationDegree: async function (req) {
        let query = 'SELECT * FROM education WHERE degree = ? '
        try {
            let rows = await db.query(query, req.degree)
            if (rows.length > 0) {
                return { status: "failed", message: "Already degree Exists" }
            } else {
                return { status: "success" }
            }
        } catch (error) {
        }
    },

    deleteEducation: async (req) => {

        const { education_id } = req
        let query = "delete from education where education_id=?";

        try {
            let rows = await db.query(query, [education_id])
            if (rows.affectedRows === 0) {
                return { status: "failed" }
            } else {
                return { status: "success", message: "education Delete" }
            }

        } catch (error) {
        }
    },
}