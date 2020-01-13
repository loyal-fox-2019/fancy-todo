"use strict"

const express = require('express')
const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authentication = require('../middleware/authentication')
const authorize = require('../middleware/authorize')

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(authentication)

router.get("/", TodoController.findAll)
router.post("/", TodoController.create)
router.patch("/:id", authorize, TodoController.update)
router.delete("/:id", authorize, TodoController.delete)

module.exports = router