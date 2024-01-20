/* eslint-disable */
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
/* eslint-disable no-alert, no-console */
const {connectDB} = require('./config/db') 
const { getCommentByPostId} = require('./controllers/postControllers')
/* eslint-enable no-alert, no-console */
const postsRoutes = require('./routes/postsRoutes')


const app = express()
dotenv.config()
connectDB()

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}))

app.use(express.json())

app.get('/' , (req, res) => {
  res.send(`Api is working`)
})

app.get('/comments', getCommentByPostId)

app.use("/posts", postsRoutes)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log('Server start in port 5000'))




