const express = require('express')
const database = require('./database')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const cors = require('cors')

const initializePassport = require('./passport-config')
const app = express()
app.use(express.json())
app.use(cors())

database.sequelize.sync({force: true})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

initializePassport(
  passport,
  async function (email) {
    return database.UserData.findOne({
      where: {
        email: email
      }
    })
  },
  async function (id) {
    return database.UserData.findOne({
      where: {
        userId: id
      }
    })
  }
)

app.get('/api/getsave/:userid', async (req, res) => {
  console.log(req.params.userid)
  const data = await database.SaveData.findOne({
    where: {
      userId: 'abc'
        }
    })
    if (data) {
        const save = data.get('save1')
        console.log(save)
        res.json(save)
    }
})

app.post('/api/updatesave', async (req, res) => {
  try {
      const save = req.body.save
      await database.updateOrCreate(database.SaveData, {userId: req.body.userid}, {save1: save})
      res.status(201).send()
  } catch {
      res.status(500).send()
  }
})


app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.post('/login', checkNotAuthenticated, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (!user) {
      return res.send({authenticated: false, userId: null})
    }
    req.logIn(user, async function(err) {
      if (err) {
        console.error(err)
        return next(err)
        }
      const userId = await user.get('userId')
      return res.send({authenticated: true, userId})
    })
  }) (req, res, next)
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const id = Date.now().toString()
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await database.UserData.create({
      userId: id,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    }) 

    res.send(id)
  } catch(e) {
    console.error(e)
    res.status(401).send()
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
  
app.listen(3080)