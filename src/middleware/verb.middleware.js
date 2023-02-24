const {ExtractJwt, Strategy} = require('passport-jwt')
const passport = require('passport')

const {findUserById} = require('../users/users.controllers')

const passwordConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'user'
}


passport.use(new Strategy(passwordConfig, (tokenDecoded, done) => {
  findUserById(tokenDecoded)
    .then(data => {
      if(data){
        done(null, tokenDecoded) // usuario si existe y es valido 
      }else{
          done(null, false)
      }
    })
    .catch(err =>{
      done(err, false)
    })
}))

module.exports = passport