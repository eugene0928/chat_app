const express = require('./lib/index.js')
const PORT = process.env.PORT || 6900
const fs = require('fs')
const path = require('path')

// create app
const app = express()

// make static folder
app.static(path.join(__dirname, '../', 'frontend'))

// set all html file to be read
app.set('views', path.join(__dirname, '../', 'frontend', 'views'))

// get request to home page
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => console.log(`server is running on http://192.168.1.6:${PORT}`))