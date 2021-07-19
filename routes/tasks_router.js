const express = require('express')
const { getTasksHandler, createTaskHandler, getTaskByIdHandler, updateTaskHandler, deleteTaskHandler } = require('../controllers/route_controller')
const router = new express.Router()

router.get('/tasks', getTasksHandler)
router.post('/tasks', createTaskHandler)
router.get('/tasks/:id', getTaskByIdHandler)
router.put('/tasks/:id', updateTaskHandler)
router.delete('/tasks/:id', deleteTaskHandler)

module.exports = router