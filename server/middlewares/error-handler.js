module.exports = function(err, req, res, next) {
  switch (err.name) {
    case 'ValidationError':
      const errors = []
      Object.keys(err.errors).forEach(key => {
        errors.push(err.errors[key].message)
      })
      res.status(400).json({ errors })
      break

    case 'BadRequest':
      res.status(400).json({ errors: err.message })
      break

    case 'JsonWebTokenError':
      res.status(400).json({ errors: err.message })
      break

    case 'NotFound':
      res.status(404).json({ errors: err.message })
      break

    case 'NotAuthorized':
      res.status(401).json({ errors: err.message })
      break

    default:
      res.status(500).json(err)
      break
  }
}
