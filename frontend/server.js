const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const HTTPS_PORT = 443;
const HTTP_PORT = 80;
const PORT =  421

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/parknich.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/parknich.xyz/fullchain.pem')
};

app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

app.use(express.static(path.join(__dirname, 'build')));

https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});