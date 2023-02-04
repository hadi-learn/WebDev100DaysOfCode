
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const encrypt = require('mongoose-encryption')
// const md5 = require('md5')
// const bcrypt = require('bcrypt')
// const saltRounds = 10
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const findOrCreate = require('mongoose-findorcreate')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(session({
    secret: 'Example Secret Code.',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/userDB')

const userSchema = new mongoose.Schema({
    email: String,
    googleId: String,
    facebookId: String,
    username: String,
    password: String,
    secret: String
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

//////////// THIS IS FOR MONGOOSE ENCRYPTION /////////////////

// const secret = process.env.SECRET_ENCRYPT
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})

//////////////////////////////////////////////////////////////

const User = new mongoose.model('User', userSchema)

// passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

passport.use(User.createStrategy())

////////////// THIS SERIALIZER ONLY FOR LOCAL STRATEGY ////////////
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

////////////// THIS SERIALIZER VALID FOR ALL STRATEGY ////////////
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/secrets',
    // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('=========================')
    // console.log(profile)
    // console.log(profile.id)
    // console.log('=========================')
    User.findOrCreate({ googleId: profile.id, username: profile.displayName }, function (err, user) {
      return cb(err, user)
    })
  }
))

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:3000/auth/facebook/secrets"
    // profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('=========================')
    // console.log(profile)
    // console.log(profile.id)
    // console.log('=========================')
    User.findOrCreate({ facebookId: profile.id, username: profile.displayName }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile']})
)

app.get('/auth/google/secrets',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        // Successful authentication, redirect to secrets page.
        res.redirect('/secrets')
    }
)

app.get('/auth/facebook',
    passport.authenticate('facebook')
)

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect to secrets page.
        res.redirect('/secrets')
    })

app.get('/auth/facebook/policy', (req, res) => {
    res.render('policy')
})

app.get('/auth/facebook/terms', (req, res) => {
    res.render('terms')
})

app.get('auth/facebook/delete', (req, res) => {
    console.log('User want to delete their data.')
})

app.get('/login', (req, res) => {
    let message = null
    if (req.query.message) {
        message = req.query.message
    } else {
        message = null
    }
    res.render('login', {message: message})
})

app.get('/register', (req, res) => {
    res.render('register', {message: null})
})

app.get('/secrets', (req, res) => {
    User.find({'secret': {$ne: null}}, (err, foundUsers) => {
        if (err) {
            console.log(err)
        } else {
            if (foundUsers) {
                res.render('secrets', {usersWithSecrets: foundUsers})
            }
        }
    })
})

app.get('/submit', (req, res) => {
    if (req.isAuthenticated) {
        res.render('submit')
    } else {
        res.redirect('/login', {message: null})
    }
})

app.get('/logout', (req, res) => {
    req.logOut(function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

app.post('/register', (req, res) => {
    ///////////////////// THIS IS BCRYPT REGISTER ROUTE /////////
    // bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         const newUser = User({
    //             email: req.body.username,
    //             password: hash
    //         })
    //         User.findOne({email: req.body.username}, (err, foundUser) => {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 if (foundUser) {
    //                     let message = encodeURIComponent(`Username already exist. Please login`)
    //                     res.redirect('/login?message=' + message)
    //                 } else {
    //                     newUser.save((err) => {
    //                         if (err) {
    //                             console.log(err)
    //                         } else {
    //                             res.render('secrets')
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // })
    /////////////////////////////////////////////////////////////

    ////////// THIS IS USING PASSPORT-LOCAL-MONGOOSE ////////////

    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            res.redirect('/register', {message: null})
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets')
            } )
        }
    })
})

app.post('/login', (req, res) => {
    ///////////////////// THIS IS BCRYPT REGISTER ROUTE ////////

    // User.findOne({email: req.body.username}, (err, foundUser) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (foundUser) {
    //             bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     if (result) {
    //                         res.render('secrets')
    //                     } else {
    //                         let message = encodeURIComponent('Incorrect password, please try again.')
    //                         res.redirect('/login?message=' + message)
    //                     }
    //                 }
    //             })
    //         } else {
    //             let message = encodeURIComponent(`You're not registered, please register first.`)
    //             res.redirect('/register?message=' + message)
    //         }
    //     }
    // })
    /////////////////////////////////////////////////////////////

    ////////// THIS IS USING PASSPORT-LOCAL-MONGOOSE ////////////

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err) {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets')
            })
        }
    })
})

app.post('/submit', (req, res) => {
    const submittedSecret = req.body.secret
    console.log(req.user.id)
    User.findById(req.user.id, (err, foundUser) => {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                foundUser.secret = submittedSecret
                foundUser.save(function() {
                    res.redirect('/secrets')
                })
            } else {
                res.redirect('/login')
            }
        }
    })
})






app.listen(3000, () => {
    console.log('Server started on port 3000')
})
