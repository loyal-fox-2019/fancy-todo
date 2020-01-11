"use strict"

const express = require('express')
const router = require('express').Router()
const TodoController = require('../controllers/todo')
const auth = require('../middleware/authentication')

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(auth)

router.get("/", TodoController.findAll)
router.post("/", TodoController.create)
router.patch("/:id", TodoController.update)
router.delete("/:id", TodoController.delete)

module.exports = router