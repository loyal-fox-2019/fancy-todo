"use strict"

const routes = require('express').Router()
const TodoController = require('../controllers/todo')

routes.get("/", TodoController.findAll)
routes.post("/", TodoController.create)
routes.patch("/:id", TodoController.update)
routes.delete("/:id", TodoController.delete)

module.exports = routes