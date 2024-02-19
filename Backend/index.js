const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log("This is a default route")
})

exports.runPythonScripts = () => {
    
}

app.listen(3000, () => {
    console.log("App is running at 3000");
})