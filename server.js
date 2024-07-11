const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const HTTPS_PORT = 443;
const HTTP_PORT = 80;

// Paths to the SSL certificate and key
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/parknich.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/parknich.xyz/fullchain.pem')
};

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create HTTPS server
https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});

// Create HTTP server that redirects to HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(HTTP_PORT, () => {
    console.log(`HTTP Server is running on port ${HTTP_PORT} and redirecting to HTTPS`);
});
