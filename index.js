const express = require('express')
const taskRoute = require('./routes/tasks_router')
require('./db/connection')
const app = express();

const PORT = 3000

app.use(express.json())

// express.static('public/task-manager-app')
app.use(express.static('public/task-manager-app'))

app.use(taskRoute)
app.listen(PORT, () => {
    console.log("Application started on port: ", PORT)
})