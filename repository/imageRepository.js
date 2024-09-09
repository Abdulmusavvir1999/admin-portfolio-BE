module.exports = {
    updateImage: async (req, res) => {
        const { hero_section_pic, profile_id } = req; // Extract necessary fields from req.body

        // SQL query for updating profile information
        const updateSql = `
            UPDATE profileInformation
            SET 
            hero_section_pic = ?
            WHERE profile_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [
                hero_section_pic, profile_id
            ]);
            return { status: "success", message: "Hero_section_pic updated successfully" };

        } catch (error) {
            console.error("Error updating hero_section_pic:", error);
            return { status: "error", message: "Database error", error };
        }
    }
}