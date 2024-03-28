const expressAsyncHandler = require('express-async-handler')
const { spawn } = require('node:child_process')


// exports.runPythonScript = (req, res) => {
//     try{

//         //accept an array from symptoms from req body
//         const symptoms = req.body;


//         const pythonProcess = spawn('python', ["../python/main.py"])

//         // create a writable stream to write data to python 
//         const writableStream  = pythonProcess.stdin

//         const test_data = ['skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain']
        
//         //pass the symptoms to the stream
//         writableStream.write(JSON.stringify(test_data))
//         writableStream.end();  

//         const response = [];
//         pythonProcess.stdout.on("data", (data) => {
//             response.push(data);
//             console.log(`stdout: ${data}`)
//         })

//         pythonProcess.stderr.on("err", (err) => {
//             console.log(`Error: ${err}`)
//         })

//         pythonProcess.on('exit', (code) => {
//             console.log("Python script exited with code ", code);
//         })


//         return res.status(200).json({
//             success:true,
//             response
//         })

       
//     }catch(err){
//         console.log(err)
//     }
// }


// exports.runPythonScript = expressAsyncHandler(async (req, res, next) => {
//     try {
//         const symptoms = req.body;

//         if(!symptoms){
//             res.status(200);
//             throw new Error("Symptoms are missing")
//         }

//         const pythonProcess = spawn('python', ["../python/main.py"]);
//         const writableStream = pythonProcess.stdin;
//         // const test_data = ['skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain'];

//         writableStream.write(JSON.stringify(symptoms));
//         writableStream.end();

//         const onDataReceived = new Promise((resolve, reject) => {
//             let buffer = ''; // Buffer to accumulate incoming data
        
//             pythonProcess.stdout.on("data", (data) => {
//                 buffer += data.toString('utf-8'); // Append incoming data to buffer
//                 // console.log("BUFFER: ", buffer);
//             });
        
//             pythonProcess.stdout.on("end", () => {
//                 try {
//                     const jsonData = JSON.parse(buffer); // Parse accumulated data as JSON
//                     console.log("Received data:", jsonData);
//                     resolve(jsonData);
//                 } catch (error) {
//                     console.error("Error parsing JSON:", error);
//                     reject(error);
//                 }
//             });
        
//             pythonProcess.stderr.on("err", (err) => {
//                 console.error(`Error: ${err}`);
//                 reject(err);
//             });
        
//             pythonProcess.on('exit', (code) => {
//                 console.log("Python script exited with code ", code);
//                 resolve(); // Resolve the promise when the Python script exits
//             });
//         });
        

//         // Wait for all data events to be processed
//         onDataReceived.then((jsonData) => {
//             console.log("Received data:", jsonData);
//             //predicted result is an array of diseases
//             const diseases = jsonData?.prediction;
//             next(diseases);
//             // Use jsonData as needed
//         }).catch((error) => {
//             console.error("An error occurred:", error);
//             res.status(400);
//             throw new Error("Error in parsing data")
//         });
        

//         // return res.status(200).json({
//         //     success: true,
//         //     // response
//         // });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// })

exports.runPythonScript = expressAsyncHandler(async (req, res, next) => {
    const symptoms = req.body;

    if (!symptoms) {
        res.status(200);
        throw new Error("Symptoms are missing");
    }

    const pythonProcess = spawn('python', ["../python/main.py"]);
    const writableStream = pythonProcess.stdin;

    writableStream.write(JSON.stringify(symptoms));
    writableStream.end();

    const onDataReceived = new Promise((resolve, reject) => {
        let buffer = '';

        pythonProcess.stdout.on("data", (data) => {
            buffer += data.toString('utf-8');
        });

        pythonProcess.stdout.on("end", async () => {
            if (buffer.trim() === '') {
                // No data received, throw an error
                res.status(400);
                throw new Error("No data received from Python process.");
            }
            try {
                const jsonData = JSON.parse(buffer);
                console.log("Received data:", jsonData);
                resolve(jsonData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.status(400);
                throw new Error("Error parsing JSON: " );
            }
        });

        pythonProcess.stderr.on("err", async (err) => {
            console.error(`Error: ${err}`);
            res.status(400);
            throw new Error("Error in Python script: " + err);
        });

        pythonProcess.on('exit', async (code) => {
            console.log("Python script exited with code ", code);
            resolve();
        });
    });

    onDataReceived.then((jsonData) => {
        console.log("Received data:", jsonData);
        const diseases = jsonData?.prediction;
        next(diseases);
    }).catch((error) => {
        console.error("An error occurred:", error);
        res.status(400);
        throw new Error("An error occurred: " + error.message);
    });

});
