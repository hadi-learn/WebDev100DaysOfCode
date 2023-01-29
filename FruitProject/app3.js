const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/fruitsDB')

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please enter the name. No name specified.']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const Fruit = mongoose.model('Fruit', fruitSchema)

const pineapple = new Fruit ({
    name: 'Pineapple',
    rating: 9,
    review: 'Great cheap fruit'
})

// pineapple.save()


const peopleSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please enter the name, no name specified.']
    },
    age: {
        type: Number
    },
    favouriteFruit: {
        type: fruitSchema
    }
})

const Person = mongoose.model('Person', peopleSchema)

const person = new Person ({
    name: 'Kamil',
    age: 36,
    favouriteFruit: pineapple
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

let personUpdateByName = function(personName, fruitName) {
    //find existing fruit that will be updated to the person
    Fruit.findOne({name: fruitName}, (err, fruit) => {
        if (err) {
            console.log(err)
        } else {
            //update fruit to the person
            Person.updateOne({name: personName}, {favouriteFruit: fruit}, (err, person) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Successfully updated ${fruit.name} to ${personName}`)
                }
            })
        }
    })
}

personUpdateByName('Hadi', 'Banana')


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
    // mongoose.connection.close()
})

Person.find(function(err, people) {
    if (err) {
        console.log(err)
    } else {
        // console.log(fruits)
        people.forEach((item) => {
            console.log(item.name)
        })
        
        // for (i=0; i<people.length; i++) {
        //     console.log(people[i].name)
        // }
    }
    // mongoose.connection.close()
})

// Person.updateOne({name: 'Hadi'}, {favouriteFruit: banana}, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Successfully updated the document.')
//     }
// })

// Fruit.deleteOne({_id:'63d3ac42d00b80d583b11bcc'}, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Successfully deleted a document.')
//     }
// })
