import express from "express";
// wrapper around CLI tool; won't do anything if CLI tool not installed; way of using it inside code
import ffmpeg from "fluent-ffmpeg";

// create express app
const app = express();
app.use(express.json());

// define end point for GET request at the root URL
app.post("/process-video", (req, res) => {
    // Get path of the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing File Path");
    }

    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-1:360') // convert video to 360p
        .on("end", () => {
            res.status(200).send("Processing finished successfully.");
        })
        .on("error", (err) => {
            console.log(`An error occurred: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        .save(outputFilePath);
    
});

// provide port at runtime; possible that the env var may not be defined in which case its 3000
const port = process.env.PORT || 3000;

// start server, listen for incoming connections on specified port
app.listen(port, () => {
    // log message to console when server starts
    console.log(
        `Video processing service listening at http://localhost:${port}`);
});