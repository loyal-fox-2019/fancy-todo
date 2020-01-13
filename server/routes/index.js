'use strict'

const router = require('express').Router()
const projectsRouter = require('./projects.js')
const usersRouter = require('./users.js')
const calendarRouter = require('./calendar.js')
const { authentication } = require('../middlewares/auth.js')

router.all('*', function(req, res, next) {
  let path = req.url.split('/')[1]
  if (req.url !== '/' && path !== 'users' && path !== 'projects' && path !== 'tasks') {
    res.status(404).json({
      message: "Not found"
    });
  } else {
    next()
  }
});

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Connected to Fancy To-do!"
  });
});

router.use('/users', usersRouter)
router.use(authentication)
router.use('/calendar', calendarRouter)
router.use('/projects', projectsRouter)

module.exports = router