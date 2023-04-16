const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id, content, status: "pending" })
    commentsByPostId[req.params.id] = comments
    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id, content,
            postId: req.params.id,
            status: "pending"
        }
    })
    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id === id)
        comment.status = status;

        try {
            await axios.post('http://localhost:4005/events', {
                type: 'CommentUpdated',
                data: {
                    id,
                    status,
                    postId,
                    content
                }
            })
        } catch (err) {
            console.log(Date.now(), "Error occured at comments");
        }
    }
    res.send()
})

app.listen(5000, () => {
    console.log("App is listening at port 5000")
})