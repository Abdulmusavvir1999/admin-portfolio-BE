module.exports = {
    // get command
    getCommand: async () => {
        var sql = "SELECT * FROM command"
        try {
            const row = await db.query(sql);
            return row
        }
        catch (error) {
            console.log(error);
        }
    },

    // addCommand

    addCommand: async (req) => {
        const { your_name, your_email, subject, command_message } = req;
        const query = "INSERT INTO command SET ?";

        // Validate input fields
        if (!your_name || !your_email || !subject || !command_message) {
            return { status: "failed", message: "Fill all fields" };
        }

        // Prepare details for insertion
        const details = {
            your_name: your_name,
            your_email: your_email,
            subject: subject,
            command_message: command_message,
        };

        try {
            // Execute the query
            const result = await db.query(query, details);

            // Check if the insertion was successful
            if (result.affectedRows === 0) {
                return { status: "failed", message: "No rows affected" };
            } else {
                return { status: "success", message: "command added successfully" };
            }
        } catch (error) {
            // Log and return an error response
            console.error("Database query failed:", error);
            return { status: "error", message: "Internal server error" };
        }
    },


    deleteCommand: async (req) => {
        console.log(req);

        const { command_id } = req
        let query = "delete from command where command_id=?";

        try {
            let rows = await db.query(query, [command_id])
            if (rows.affectedRows === 0) {
                return { status: "failed" }
            } else {
                return { status: "success", message: "command Delete" }
            }

        } catch (error) {
            console.log(error);
        }
    },
}