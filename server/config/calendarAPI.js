const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://api.kloudless.com/v1'
})