// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const request = require('request')
const app = express()
const port = process.env.PORT || 3999
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {Akqq1LRCE4ZABFHwCIHeQTuv//SnUJ8DFjEbdiU2rNwjQ/hDLseawVRk21/5GoQSCzb8Qbi6am62mQapoL0rNcX7gVJfCvtGokjmUYl0WQjwNVFisKCAfZEHAT6Udzezib0ik54KLeOJaEwvC9dk3wdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/tesa.thitgorn.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/tesa.thitgorn.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/tesa.thitgorn.com/chain.pem",
    "utf8"
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(4000, () => {
    console.log("HTTPS Server running on port 4000");
  });