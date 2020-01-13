const router = require('express').Router()
const User = require('../controllers/User');
const List = require('../controllers/List');

router.get('/findall', User.findAll)
router.post('/register', User.createUser)
router.post('/addList', List.addTodo)
router.get('/findList', List.findTodo)
router.post('/login', User.login)

module.exports = router