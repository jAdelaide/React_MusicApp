const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '50ac6b1ef9ed4171939657783cf817d7',
        clientSecret: 'e721ef4cbff04eb2a5648398542676f0'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch(() => {
            console.log(error)
            res.sendStatus(400)
        })
}) 

app.listen(3001)