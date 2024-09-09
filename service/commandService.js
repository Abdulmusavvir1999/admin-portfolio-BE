const commandRepository = require("../repository/commandRepository")

module.exports = {
    //get command
    getCommand: async () => {
        let response = commandRepository.getCommand()
        return response
    },

    // add command
    addCommand: async (req) => {
        try {
            let addCommandResponse = await commandRepository.addCommand(req);
            console.log(addCommandResponse);

            return addCommandResponse;
        }
        catch (error) {
            console.error("Error in addCommand:", error);
            return { status: "failed", message: "An error occurred" };
        }
    },

    // delete command
    deleteCommand: async (req) => {
        let response = commandRepository.deleteCommand(req)
        return response
    },

}