const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

const events = []

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event)
    await axios.post('http://localhost:4000/events', event); // posts
    await axios.post('http://localhost:5000/events', event); // comment
    await axios.post('http://localhost:7000/events', event); // query
    await axios.post('http://localhost:8000/events', event); // moderation

    res.status(200).send();
})

app.get('/events', (req, res) => {
    res.status(200).send(events)
})

app.listen(4005, () => {
    console.log("Listening at 4005")
})
