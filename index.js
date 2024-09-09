const express = require("express");
const app = express();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // To parse JSON bodies

// Use built-in JSON body parser
app.use(express.json());

// Use CORS middleware
const cors = require("cors");
app.use(cors());

// global use 
const path = require("path")
// app.use('/public', express.static('/'));
app.use(express.static(path.join(__dirname, './public')))

// Database connection
global.db = require("./database/db");

// !router
// about me
const portfolioRouter = require("./router/portfolioRouter")
app.use("/", portfolioRouter)

// education
const educationRouter = require("./router/educationRouter")
app.use("/", educationRouter)

// experience
const experienceRouter = require("./router/experienceRouter")
app.use("/", experienceRouter)

// skill
const skillRouter = require("./router/skillRouter")
app.use("/", skillRouter)

// project
const projectRouter = require("./router/projectRouter")
app.use("/", projectRouter)

// user
const userRouter = require("./router/userrouter")
app.use("/", userRouter)

// command
const commandRouter = require("./router/commandRouter")
app.use("/", commandRouter)

// login
const loginRouter = require("./router/loginRouter")
app.use("/", loginRouter)

// login
const imageRouter = require("./router/imageRouter")
app.use("/", imageRouter)



// Start the server
app.listen(3005, () => {
    console.log(`Server is running on port 3005`);
});
