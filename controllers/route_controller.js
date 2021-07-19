const Task = require('../models/task_model')

let getTasksHandler = async function(req, res) {
    try {
        let match = {}
        let sort = {}
        if (req.query.sort) {
            const tmp = req.query.sortBy.split(":")
            sort[tmp[0]] = tmp[1] === 'asc' ? 1 : -1
        } else {
            sort["updatedAt"] = -1
        }

        if (req.query.status) {
            match['status'] = req.query.status
        }

        if (req.query.name) {
            match['name'] = req.query.name
        }

        const tasks = await Task.find(match).sort(sort)
        res.status(200).send(tasks)
    } catch (err) {
        console.log("Unable to read Task list")
        console.log(err)
        res.status(400).send("Unable to read Task list")
    }
}

let getTaskByIdHandler = async function(req, res) {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id })
        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.status(200).send(task)
    } catch (err) {
        console.log("Unable to read Task by Id")
        console.log(err)
        res.status(400).send("Unable to read Task by Id")
    }
}

let createTaskHandler = async function(req, res) {
    const task = new Task({
        ...req.body
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        console.log("Unable To Create Task")
        console.log(err)
        res.status(400).send("Unable To Create Task")

    }
}

let updateTaskHandler = async function(req, res) {
    const _id = req.params.id
    const respObj = Object.keys(req.body)
    const allowedUpdate = ['name', 'description', 'status']
    const validUpdate = respObj.every(item => allowedUpdate.includes(item))

    if (!validUpdate) {
        return res.status(400).send("Invalid Update Operation")
    }
    try {
        const task = await Task.findOne({ _id })
        if (!task) {
            return res.status(404).send("Task not found")
        }
        respObj.forEach(item => task[item] = req.body[item])

        const resp = task.save()
        res.status(200).send(resp)
    } catch (err) {
        console.log("Unable to update Task")
        console.log(err)
        res.status(400).send("Unable to update Task")
    }
}

let deleteTaskHandler = async function(req, res) {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id })
        if (!task) {
            return res.status(404).send("Task not found")
        }

        const resp = task.remove()
        res.status(200).send(resp)

    } catch (err) {
        console.log("Unable to delete Task")
        console.log(err)
        res.status(400).send("Unable to delete Task")
    }
}
module.exports = {
    getTasksHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    getTaskByIdHandler
}