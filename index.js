const express = require('express')
const speakeasy = require('speakeasy')

const app = express()

app.use(express.static('public'))

app.get('/generate-totp', (req, res) => {
    const secret = req.query.secret
    const token = generateTOTP(secret)
    const timeLeft = (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))

    res.json({ token, timeLeft })
})

function generateTOTP(secret) {
    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    })
    return token
}

app.listen(8000, () => {
    console.log(`Server is running on http://localhost:8080`)
})
