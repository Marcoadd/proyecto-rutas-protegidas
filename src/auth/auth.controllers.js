const {findUserByEmail} = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
  try {
    const user = findUserByEmail
    const verifyPassword = comparePassword(password, user.password)
    if(verifyPassword){
      return user
    }else{
      return null
    }
  } catch (error) {
    return null
  }
}

module.exports = checkUsersCredentials