module.exports = app =>{
    const controllerTasks = require("../controllers/controllerTasks.js")
    app.post("/Tasks", controllerTasks.create)
    app.get("/Tasks/:id", controllerTasks.list)
    app.put("/Tasks", controllerTasks.update)
    app.delete("/Tasks/:taskId/:userId", controllerTasks.delete)
}