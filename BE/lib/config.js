module.exports = app =>{
    const cors = require("cors")
    const bodyParser = require("body-parser")

    app.set("port", 3001)
    app.use(bodyParser.json())
    app.use(cors())
}