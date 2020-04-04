module.exports = app =>{
    const controllerUser = require("../controllers/controllerUser.js")
    app.post("/Login", controllerUser.login)
    app.post("/Cadastro", controllerUser.create)
    app.get('/', controllerUser.list)
}