const express = require('express')
const router = express.Router()
const todocontroller = require('../controllers/todocontroller')
const middleware = require('../middleware/authen')
const err = require('../middleware/errhandling')

router.use(middleware.authen)
router.get('/', todocontroller.findall)
router.get('/:id', todocontroller.findone)
router.post('/', todocontroller.create)

router.delete('/:todoid', middleware.author,todocontroller.delete)
router.patch('/:todoid', middleware.author,todocontroller.patch)

router.use(err.err)

module.exports = router