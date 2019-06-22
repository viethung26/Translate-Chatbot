const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname.concat('/public/index.html'))
})
app.listen(port, () => {
    console.log('server is running on port '.concat(port, '...'))
})