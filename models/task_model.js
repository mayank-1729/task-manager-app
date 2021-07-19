const mongo = require('mongoose')

const taskSchema = mongo.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongo.model('task', taskSchema)

module.exports = Task