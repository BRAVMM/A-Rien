const express = require("express")
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}


// Middleware

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// test api

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." })
})

// port

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})