const express = require('express');
const path = require('path');

const app = express();
const PORT =  3000
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
   }
   next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});