// JWT
const jwt = require("jsonwebtoken");


// module export
module.exports = {

    getImage: async () => {
        var sql = "SELECT * FROM image"
        try {
            const row = await db.query(sql);
            return row
        }

        catch (error) {
        }

    },


    aboutMe: async () => {
        var sql = "SELECT * FROM profileInformation"
        try {
            const row = await db.query(sql);
            return row
        }

        catch (error) {
        }

    },
    // Ensure `req` is passed to the function or use `req.body` if this function is part of a route handler.
    aboutUpdate: async (req) => {
        const { name, phone, address, birthday, experience, email, freelance, instagram_link, x_link, linkedin_link, facebook_link, profile_id } = req; // Extract necessary fields from req.body

        // SQL query for updating profile information
        const updateSql = `
        UPDATE profileInformation
        SET 
            name = ?, 
            phone = ?, 
            address = ?, 
            birthday = ?, 
            experience = ?, 
            email = ?, 
            freelance = ?, 
            instagram_link = ?, 
            x_link = ?, 
            linkedin_link = ?, 
            facebook_link = ? 
        WHERE profile_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [
                name, phone, address, birthday, experience, email, freelance, instagram_link, x_link, linkedin_link, facebook_link, profile_id
            ]);
            return { status: "success", message: "Profile updated successfully" };

        } catch (error) {
            console.error("Error updating profile:", error);
            return { status: "error", message: "Database error", error };
        }
    },


    heroSectionImageUpdate: async (req) => {
        const { hero_section_pic, profile_id } = req // Extract necessary fields from req.body

        const updateSql = `UPDATE profileInformation SET hero_section_pic = ? WHERE profile_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [hero_section_pic, profile_id]);

            // Check if any rows were affected
            if (result.affectedRows > 0) {
                return { status: "success", message: "Profile updated successfully" };
            } else {
                return { status: "warning", message: "Profile not found or no changes made" };
            }

        } catch (error) {
            console.error("Error updating profile:", error);
            return { status: "error", message: "Database error", error };
        }
    },


    aboutImageUpdate: async (req) => {
        const { about_me_pic, profile_id } = req; // Extract necessary fields from req.body


        const updateSql = `UPDATE profileInformation SET about_me_pic = ? WHERE profile_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [about_me_pic, profile_id]);

            // Check if any rows were affected
            if (result.affectedRows > 0) {
                return { status: "success", message: "Profile updated successfully" };
            } else {
                return { status: "warning", message: "Profile not found or no changes made" };
            }

        } catch (error) {
            console.error("Error updating profile:", error);
            return { status: "error", message: "Database error", error };
        }
    },


    resumeImageUpdate: async (req) => {
        const { resume_pic, profile_id } = req; // Extract necessary fields from req.body


        const updateSql = `UPDATE profileInformation SET resume_pic = ? WHERE profile_id = ?`;

        try {
            // Perform the update
            const result = await db.query(updateSql, [resume_pic, profile_id]);

            // Check if any rows were affected
            if (result.affectedRows > 0) {
                return { status: "success", message: "Profile updated successfully" };
            } else {
                return { status: "warning", message: "Profile not found or no changes made" };
            }

        } catch (error) {
            console.error("Error updating profile:", error);
            return { status: "error", message: "Database error", error };
        }
    },




}
