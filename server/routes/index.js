const router = require('express').Router()

const AuthRoutes = require('./AuthRoutes')
const UserRoutes = require('./UserRoutes')
const Projects = require('./ProjectRoutes')
router.get('/', function (req, res) {  
    res.send('~~~~')
})
router.use('/auth', AuthRoutes)
router.use(require('../middlewares/Authentication'))
router.use('/users', UserRoutes)
router.use('/projects', Projects)

module.exports = router