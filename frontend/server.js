const express = require('express');
const path = require('path');

const app = express();
const PORT =  80;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});