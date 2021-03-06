const express = require('express')
const cors = require('cors')
const server = express()
const User = require('./models/User')

server.use(express.json(), cors())

server.post('/register', async (req, res) => {
  const {username, phoneNumber} = req.body
  console.log(username, phoneNumber)
  User.register(username, phoneNumber, (err, verification) => {
    console.log(verification)
    if (err) {
      console.log(err)
      res.status(500).json({error: err})
    }
    res.status(200).json({verification})
  })
})

server.post('/verify', async (req, res) => {
  const {verificationCode} = req.body
  console.log(req.headers)
  const phoneNumber = req.headers.phonenumber || '281-818-7900'
  User.verify(phoneNumber, verificationCode, (err, verificationSuccess) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err})
    }
    res.status(200).json({verificationSuccess})
  })
})

server.post('/login', async (req, res) => {
  const {phoneNumber} = req.body
  User.login(phoneNumber, (err, verification) => {
    console.log(verification)
    if (err) {
      console.log(err)
      res.status(500).json({error: err})
    }
    res.status(200).json({verification})
  })
})

const port = 5000
server.listen(port, () => {
  console.log(`\n=== Listening on http://localhost:${port} ===\n`)
})
