const express = require('express')
const router = express.Router()
const todocontroller = require('../controllers/todocontroller')
const middleware = require('../middleware/authen')

router.use(middleware.authen)
router.get('/', todocontroller.findall)
router.get('/:id', todocontroller.findone)
router.post('/', todocontroller.create)

router.delete('/:todoid', middleware.author,todocontroller.delete)
router.patch('/:todoid', middleware.author,todocontroller.patch)

module.exports = router