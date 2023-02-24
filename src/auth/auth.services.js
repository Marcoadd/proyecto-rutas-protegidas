const checkUserCredential = require('./auth.controllers')
const responses = require('../utils/responses.handler')
const jwt = require('jsonwebtoken')

const postLogin = (req, res) => {
  const {email, password} = req.body
  checkUserCredential(email, password)
  .then(data => {
    if (data) {
      const token = jwt.sign({
        id: data.id,
        email: data.email
      }, 'user', {
        expiresIn: '1d'
      })
      responses.success({
        res,
        status: 200,
        message: 'Correct credentials',
        data: token
      })
    }else{
      responses.error({
        res,
        status: 400,
        message: 'Invalid Credentials'
      })
    }
  })
  .catch(err => {
    responses.error({
      res,
      status: 400,
      message: 'Something bad',
      data: err
    })
  })
}

module.exports = postLogin