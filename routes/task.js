const Router = require('express').Router()
const TaskCtrl = require('../controllers/task.controller')

Router.get('/', TaskCtrl.getAllTask)
Router.post('/', TaskCtrl.addTask)
Router.delete('/:id', TaskCtrl.deleteTask)
Router.put('/:id', TaskCtrl.updateTask)
Router.patch('/:id', TaskCtrl.markComplete)

module.exports = Router