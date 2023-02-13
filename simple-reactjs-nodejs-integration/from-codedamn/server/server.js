const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Check data from the server on <a href="/message">'/message'</a> endpoint.`)
})

app.get('/message', (req, res) => {
    res.json(
        {
            message: 'Hello from the server!'
        }
    )
})





const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})
