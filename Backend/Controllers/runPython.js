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


exports.runPythonScript = async (req, res) => {
    try {
        const symptoms = req.body;

        const pythonProcess = spawn('python', ["../python/main.py"]);
        const writableStream = pythonProcess.stdin;
        const test_data = ['skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain'];

        writableStream.write(JSON.stringify(test_data));
        writableStream.end();

        const response = [];
        
        // Create a Promise to wait for all data events
        const onDataReceived = new Promise((resolve, reject) => {
            pythonProcess.stdout.on("data", (data) => {
                response.push(data.toString('utf-8').split("\r\n"));
                console.log(`stdout: ${data}`);
            });

            pythonProcess.stderr.on("err", (err) => {
                console.log(`Error: ${err}`);
                reject(err);
            });

            pythonProcess.on('exit', (code) => {
                console.log("Python script exited with code ", code);
                resolve();
            });
        });

        // Wait for all data events to be processed
        await onDataReceived;

        return res.status(200).json({
            success: true,
            response
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
