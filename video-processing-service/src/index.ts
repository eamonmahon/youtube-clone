import express from "express";

// create express app
const app = express();
const port = 3000;

// define route handler for GET request at the root URL
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// start server, listen for incoming connections on specified port
app.listen(port, () => {
    // log message to console when server starts
    console.log(
        `Video processing service listening at http://localhost:${port}`);
});