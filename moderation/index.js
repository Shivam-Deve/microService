const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? "rejected" : "approved";
        setTimeout(async () => { // takes 8 seconds to complete moderation
            try {
                await axios.post("http://localhost:4005/events", {
                    type: "CommentModerated",
                    data: {
                        id: data.id,
                        postId: data.postId,
                        status,
                        content: data.content
                    }
                })
            } catch (err) {
                console.log("Error occured at moderation axios")
            }
        }, 8000)
    }
    res.send()
})

app.listen(8000, () => {
    console.log("Listening at 8000")
})