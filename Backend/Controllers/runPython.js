const expressAsyncHandler = require("express-async-handler");
const { spawn } = require("node:child_process");
const path = require("node:path");

exports.runPythonScript = expressAsyncHandler(async (req, res, next) => {
  try {
    const symptoms = req.body;

    if (symptoms.length === 0) {
      res.status(400);
      throw new Error("Symptoms are missing");
    }

    console.log("Symptoms: ", symptoms);
    const pythonScriptPath = path.join(__dirname, "../python/main.py");
    console.log("Python script path: ", pythonScriptPath);
    const pythonProcess = spawn("python", ["../python/main.py"]);
    const writableStream = pythonProcess.stdin;

    writableStream.write(JSON.stringify(symptoms));
    writableStream.end();

    const onDataReceived = new Promise((resolve, reject) => {
      let buffer = "";

      pythonProcess.stdout.on("data", (data) => {
        buffer += data.toString("utf-8");
        console.log("Buffer: ", buffer);
      });

      pythonProcess.stdout.on("end", async () => {
        if (buffer.trim() === "") {
          // No data received, pass an error to the error handling middleware
          const error = new Error("No data received from Python process.");
          return next(error);
        }
        try {
          const jsonData = JSON.parse(buffer);
          console.log("Received data:", jsonData);
          resolve(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          next(error);
        }
      });

      pythonProcess.stderr.on("err", async (err) => {
        console.error(`Error: ${err}`);
        next(new Error("Error in Python script: " + err));
      });

      pythonProcess.on("exit", async (code) => {
        console.log("Python script exited with code ", code);
        resolve();
      });
    });

    onDataReceived
      .then((jsonData) => {
        console.log("Received data:", jsonData);

        if(jsonData?.error){
          res.status(400)
          throw new Error(jsonData?.error)
        }
        const diseases = jsonData?.prediction[0];
        console.log("Diseases: ", diseases);
        req.diseases = diseases
        next();
      })
      .catch(next); // Pass any error from onDataReceived to the error handling middleware
  } catch (error) {
    next(error); // Catch any synchronous errors and pass them to the error handling middleware
  }
});
