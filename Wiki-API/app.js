
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')
const { result } = require('lodash')
const date =  require(__dirname + '/date.js')
const year = date.getYear()

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.set('strictQuery', false)
// mongoose.connect('mongodb://localhost:27017/wikiDB')
mongoose.connect(`mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PW}@cluster0.ouzmlbq.mongodb.net/wikiDB`)

const articleSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Please enter a title. No title specified.']
    },
    content: {
        type: String,
        required: [true, 'Please write your content. No content specified.']
    }
})

const Article = new mongoose.model('Article', articleSchema)

/////////////////// REQUEST FOR ALL ARTICLES //////////////////

app.route('/articles')
.get((req, res) => {
    Article.find({}, (err, foundArticles) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            // console.log(foundArticles)
            res.send(foundArticles)
        }
    })
})
.post((req, res) => {
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save((err) => {
        if (err) {
            res.send(err)
        } else {
            res.send('New article created and saved to database.')
        }
    })
})
.delete((req, res) => {
    Article.deleteMany({}, (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send('Successfully deleted all articles.')
        }
    })
})

/////////////////// REQUEST FOR A SPECIFIC ARTICLE //////////////////

app.route('/articles/:requestedArticle')
.get((req, res) => {
    let requestedArticle = req.params.requestedArticle
    Article.findOne({title: requestedArticle}, (err, foundArticle) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(foundArticle)
        }
    })
})
.put((req, res) => {
    
    ////////// USING findOneAndReplace method /////////

    // Article.findOneAndReplace(
    //     {title: req.params.requestedArticle},
    //     {title: req.body.title, content: req.body.content},
    //     {returnDocument: 'after'},
    //     (err) => {
    //         if (err) {
    //             console.log(err)
    //             res.send(err)
    //         } else {
    //             res.send(`'${req.params.requestedArticle}' and it's content was successfully replaced with '${req.body.title}'`)
    //         }
    //     }
    // )

    ////////// USING replaceOne method /////////

    Article.replaceOne(
        {title: req.params.requestedArticle},
        {
            title: req.body.title,
            content: req.body.content
        },
        (err, respond) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                // res.send(`Successfully replace '${req.params.requestedArticle}' with '${req.body.title}'.`)
                // res.send(respond)
                res.send({
                    message: `Successfully replace '${req.params.requestedArticle}' with '${req.body.title}`,
                    respond: respond
                })
            }
        }
    )
})
.patch((req, res) => {
    Article.updateOne(
        {title: req.params.requestedArticle},

        /////// USING INDIVIDUAL FIELD //////
        // {
        //     title: req.body.title, 
        //     content: req.body.content
        // },

        /////// USING ALL BODY REQUEST WITH ATOMIC OPERATOR //////
        {$set: req.body},
        (err, respond) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.send({
                    message: `Successfully replace the content of '${req.params.requestedArticle}'.`,
                    respond: respond
                })
            }
        }
    )
})
.delete((req, res) => {
    Article.deleteOne(
        {title: req.params.requestedArticle},
        (err, respond) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.send({
                    message: `Successfully deleted '${req.params.requestedArticle}'.`,
                    respond: respond
                })
            }
        }
    )
})








app.listen(3000, function() {
    console.log("Server started on port 3000");
  });