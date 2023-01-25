const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/fruitsDB')

const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
})

const Fruit = mongoose.model('Fruit', fruitSchema)

const fruit = new Fruit ({
    name: 'Apple',
    rating: 7,
    review: 'Popular fruit'
})

// fruit.save()


const peopleSchema = new mongoose.Schema ({
    name: String,
    age: Number
})

const Person = mongoose.model('Person', peopleSchema)

const person = new Person ({
    name: 'Hadi',
    age: 36
})

// person.save()

const kiwi = new Fruit ({
    name: 'Kiwi',
    rating: 6,
    review: 'Too sour for me.'
})

const orange = new Fruit ({
    name: 'Orange',
    rating: 8,
    review: 'I like the scent!'
})

const banana = new Fruit ({
    name: 'Banana',
    rating: 9,
    review: 'Great for breakfast.'
})

// Fruit.insertMany([kiwi, orange, banana], (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Successfully saved all the fruits to fruitsDB')
//     }
// })

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err)
    } else {
        // console.log(fruits)
        // fruits.forEach((item) => {
        //     console.log(item.name)
        // })
        
        for (i=0; i<fruits.length; i++) {
            console.log(fruits[i].name)
        }
    }
    mongoose.connection.close()
})


