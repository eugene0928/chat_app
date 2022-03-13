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

app.get('/users', (req, res) => {
    const users = fs.readFileSync(path.join(__dirname, 'database', 'users.json'), 'utf-8')

    res.end(users)
})

app.post('/users', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let info = await req.body

    let users = fs.readFileSync(path.join(__dirname, 'database', 'users.json'), 'utf-8')
    users = JSON.parse(users)
    users.data.users.push(info)

    fs.writeFileSync(path.join(__dirname, 'database', 'users.json'), JSON.stringify(users, null, 4))
    res.end()
})

app.get('/app', (req, res) => {
    res.render('main')
})

app.get('/chat', (req, res) => {
    let chats = fs.readFileSync(path.join(__dirname, 'database', 'chat.json'), 'utf-8')

    res.end(chats)
})

app.listen(PORT, () => console.log(`server is running on http://192.168.1.6:${PORT}`))