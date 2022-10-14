const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'Your email or password is incorrect' })
    }
    const storedPassword = await user.get('password')

    try {
      if (await bcrypt.compare(password, storedPassword)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Your email or password is incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser(async (user, done) => {
    const userId = await user.get('userId')
    return done(null, userId)
  })
  passport.deserializeUser(async (id, done) => {
    user = await getUserById(id)
    return done(null, user)
  })
}

module.exports = initialize