
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const encrypt = require('mongoose-encryption')
// const md5 = require('md5')
const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/userDB')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.']
    }
})

//////////// THIS IS FOR MONGOOSE ENCRYPTION /////////////////

// const secret = process.env.SECRET_ENCRYPT
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})

//////////////////////////////////////////////////////////////

const User = new mongoose.model('User', userSchema)

app.get('/', (req, res) => {
    res.render('home')
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

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        } else {
            const newUser = User({
                email: req.body.username,
                password: hash
            })
            User.findOne({email: req.body.username}, (err, foundUser) => {
                if (err) {
                    console.log(err)
                } else {
                    if (foundUser) {
                        let message = encodeURIComponent(`Username already exist. Please login`)
                        res.redirect('/login?message=' + message)
                    } else {
                        newUser.save((err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                res.render('secrets')
                            }
                        })
                    }
                }
            })
        }
    })
})

app.post('/login', (req, res) => {
    User.findOne({email: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (result) {
                            res.render('secrets')
                        } else {
                            let message = encodeURIComponent('Incorrect password, please try again.')
                            res.redirect('/login?message=' + message)
                        }
                    }
                })
            } else {
                let message = encodeURIComponent(`You're not registered, please register first.`)
                res.redirect('/register?message=' + message)
            }
        }
    })
})






app.listen(3000, () => {
    console.log('Server started on port 3000')
})
